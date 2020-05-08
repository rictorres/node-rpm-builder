'use strict';

var chalk = require('chalk');
var execFile = require('child_process').execFile;
var fsx = require('fs-extra');
var globby = require('globby');
var path = require('path');
var shortid = require('shortid');
var _ = require('lodash');

var writeSpec = require('./lib/spec');

var logger;

/**
 * Creates the folder structure needed to create
 * the RPM package.
 *
 * @param  {String} tmpDir the path where the folder structure will reside
 */
function setupTempDir(tmpDir) {
  var rpmStructure = ['BUILD', 'BUILDROOT', 'RPMS', 'SOURCES', 'SPECS', 'SRPMS'];

  // If the tmpDir exists (probably from previous build), delete it first
  if (fsx.existsSync(tmpDir)) {
    logger(chalk.cyan('Removing old temporary directory.'));
    fsx.removeSync(tmpDir);
  }

  // Create RPM folder structure
  logger(chalk.cyan('Creating RPM directory structure at:'), tmpDir);
  _.forEach(rpmStructure, function(dirName) {
    fsx.mkdirpSync(path.join(tmpDir, dirName));
  });
}

/**
 * Expand the patterns/files (specified by the user)
 * that should be ignored when building the RPM package.
 *
 * @param  {Array} excludeFiles patterns/files to ignore
 * @return {Array}              expanded list of files to ignore
 */
function retrieveFilesToExclude(excludeFiles) {
  return globby.sync(excludeFiles).map(function(file) {
    return path.normalize(file);
  });
}

function checkDirective(directive) {
  if (typeof directive === 'undefined') {
    return true;
  }
  return directive.match(/^(?:doc|config|attr|verify|docdir|dir)/);
}

/**
 * 1. Normalize and expand the patterns/files (specified by the user)
 *    that should be included in the RPM package.
 * 2. Copies the files to the respective destination.
 *
 * @param  {Array}  files         patterns/files to include
 * @param  {Array}  excludeFiles  expanded list of files to ignore
 * @param  {String} buildRoot     where all files should be copied into
 * @return {Array}                list of files to include in the RPM
 */
function prepareFiles(files, excludeFiles, buildRoot) {
  var _files = [];
  var filesToExclude = retrieveFilesToExclude(excludeFiles);

  _.forEach(files, function(file) {
    if (!file.hasOwnProperty('src') || !file.hasOwnProperty('dest')) {
      throw new Error('All files/folders must have source (src) and destination (dest) set');
    }

    file.cwd = (file.cwd || '.') + '/';

    var actualSrc = globby.sync(path.join(file.cwd, file.src));

    fsx.ensureDir(path.join(buildRoot, file.dest));

    _.forEach(actualSrc, function(srcFile) {
      // Check whether to ignore this file
      if (filesToExclude.indexOf(srcFile) > -1) {
        return;
      }

      // files/folders should be copied
      // taking into account the cwd
      // so the destination should be
      // relative to the cwd
      var copyTarget = path.normalize(srcFile).replace(path.normalize(file.cwd), '');
      var dest = path.join(file.dest, copyTarget);

      if (checkDirective(file.directive)) {
        _files.push({path: dest, directive: file.directive});
      }
      else {
        throw new Error('Invalid file directive informed: ' + file.directive);
      }

      fsx.copySync(srcFile, path.join(buildRoot, dest));
    });
  });

  return _files;
}

/**
 * Runs the rpmbuild tool in a child process.
 *
 * @param  {String}   buildRoot  where all included files reside
 * @param  {String}   specFile   path to the file from which the RPM package will be created
 * @param  {String}   rpmDest    where the .rpm file should be copied to
 * @param  {Function} cb         callback function to be executed when the task is done
 */
function buildRpm(buildRoot, specFile, rpmDest, execOpts, cb) {
  // Build the RPM package.
  var cmd = [
    'rpmbuild',
    '-bb',
    '--buildroot',
    buildRoot,
    specFile
  ];
  var cmdFile = cmd[0];
  cmd.shift();

  logger(chalk.cyan('Executing:'), cmd);

  execOpts = execOpts || {};

  execFile(cmdFile, [cmd], execOpts, function rpmbuild(err, stdout) {

    if (err) {
      return cb(err);
    }

    if (stdout) {
      var rpm = stdout.match(/(\/.+\..+\.rpm)/);

      if (rpm && rpm.length > 0) {
        var rpmDestination = rpm[0];

        if (rpmDest) {
          rpmDestination = path.join(rpmDest, path.basename(rpmDestination));
          logger(chalk.cyan('Copying RPM package to:'), rpmDestination);
          fsx.copySync(rpm[0], rpmDestination);
        }

        return cb(null, rpmDestination);
      }
    }
  });
}

function rpm(options, cb) {
  if (!options || typeof options !== 'object') {
    throw new TypeError('options object is missing');
  }

  if (!cb || typeof cb !== 'function') {
    throw new TypeError('callback is missing');
  }

  var defaults = {
    name: 'no-name',
    summary: 'No summary',
    description: 'No description',
    version: '0.0.0',
    release: '1',
    epoch: '',
    license: 'MIT',
    vendor: 'Vendor',
    group: 'Development/Tools',
    buildArch: 'noarch',
    tempDir: 'tmp-' + shortid.generate(),
    files: [],
    excludeFiles: [],
    rpmDest: process.cwd(),
    keepTemp: false,
    verbose: true,
    execOpts: {}
  };

  options = _.defaults(options, defaults);

  logger = options.verbose ? require('./lib/logger') : function() {
    return;
  };

  var tmpDir = path.resolve(options.tempDir);
  var buildRoot = path.join(tmpDir, '/BUILDROOT/');
  var files = [];

  setupTempDir(tmpDir);

  try {
    files = prepareFiles(options.files, options.excludeFiles, buildRoot);
  } catch(ex) {
    return cb(ex);
  }

  // Write spec file
  var specFile = writeSpec(files, options);
  logger(chalk.cyan('SPEC file created:'), specFile);

  buildRpm(buildRoot, specFile, options.rpmDest, options.execOpts, function(err, rpm) {
    if (err) {
      return cb(err);
    }

    // Remove temp folder
    if (!options.keepTemp) {
      logger(chalk.cyan('Removing RPM directory structure at:'), tmpDir);
      fsx.removeSync(tmpDir);
    }

    return cb(null, rpm);
  });
}

module.exports = rpm;
