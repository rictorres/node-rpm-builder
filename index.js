'use strict';

var chalk = require('chalk');
var exec = require('child_process').exec;
var fsx = require('fs-extra');
var globby = require('globby');
var path = require('path');
var shortid = require('shortid');
var _ = require('lodash');

var writeSpec = require('./lib/spec');

function build(options, cb) {
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
    license: 'MIT',
    vendor: 'Vendor',
    group: 'Development/Tools',
    buildArch: 'noarch',
    tempDir: 'tmp-' + shortid.generate(),
    files: [],
    excludeFiles: [],
    keepTemp: false
  };

  options = _.defaults(options, defaults);

  var tmpDir = path.resolve(options.tempDir);
  var buildRoot = path.join(tmpDir, '/BUILDROOT/');
  var rpmStructure = ['BUILD', 'BUILDROOT', 'RPMS', 'SOURCES', 'SPECS', 'SRPMS'];

  // If the tmpDir exists (probably from previous build), delete it first
  if (fsx.existsSync(tmpDir)) {
    console.log(chalk.cyan('Removing old temporary directory.'));
    fsx.removeSync(tmpDir);
  }

  // Create RPM folder structure
  console.log(chalk.cyan('Creating RPM directory structure at:'), tmpDir);
  _.forEach(rpmStructure, function(dirName) {
    fsx.mkdirpSync(path.join(tmpDir, dirName));
  });

  var excludeFiles = globby.sync(options.excludeFiles).map(function(file) {
    return path.normalize(file);
  });

  // Copy source files to the BUILDROOT folder
  var files = [];
  _.forEach(options.files, function(file) {
    if (!file.hasOwnProperty('src') || !file.hasOwnProperty('dest')) {
      var err = new Error('All files/folders must have source (src) and destination (dest) set');
      return cb(err);
    }

    file.cwd = (file.cwd || '.') + '/';

    var actualSrc = globby.sync(path.join(file.cwd, file.src));

    fsx.ensureDir(path.join(buildRoot, file.dest));

    _.forEach(actualSrc, function(srcFile) {
      // Check whether to ignore this file
      if (excludeFiles.indexOf(srcFile) > -1) {
        console.log(srcFile)
        return;
      }

      // files/folders should be copied
      // taking into account the cwd
      // so the destination should be
      // relative to the cwd
      var copyTarget = path.normalize(srcFile).replace(path.normalize(file.cwd), '');
      var dest = path.join(file.dest, copyTarget);
      files.push(dest);
      fsx.copySync(srcFile, path.join(buildRoot, dest));
    });
  });

  // Write spec file
  var specFile = writeSpec(files, options);
  console.log(chalk.cyan('SPEC file created:'), specFile);

  // Build the RPM package.
  var cmd = [
    'rpmbuild',
    '-bb',
    '-vv',
    '--buildroot',
    buildRoot,
    specFile
  ].join(' ');

  console.log(chalk.cyan('Executing:'), cmd);

  exec(cmd, {}, function rpmbuild(err, stdout) {

    if (err) {
      return cb(err);
    }

    if (stdout) {
      var rpm = stdout.match(/(\/.+\..+\.rpm)/);
      if (rpm && rpm.length > 0) {
        var rpmDest = path.join(process.cwd(), path.basename(rpm[0]));
        console.log(chalk.cyan('Copying RPM package to:'), rpmDest);
        fsx.copySync(rpm[0], rpmDest);

        // Remove temp folder
        if (!options.keepTemp) {
          console.log(chalk.cyan('Removing RPM directory structure at:'), tmpDir);
          fsx.removeSync(tmpDir);
        }

        return cb(null, rpmDest);
      }
    }

  });
}

module.exports = build;
