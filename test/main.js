'use strict';

/* global describe, it, after */

var assert = require('assert');
var exec = require('child_process').exec;
var fsx = require('fs-extra');
var globby = require('globby');
var path = require('path');
var shortid = require('shortid');
var _ = require('lodash');

var buildRpm = require('../');

describe('rpm builder', function() {

  describe('rpm init', function() {

    it('should throw an error if options object is missing', function() {
      assert.throws(buildRpm, TypeError);
    });

    it('should throw an error if options is not an object', function() {
      assert.throws(function() {
        buildRpm('');
      }, TypeError);
    });

    it('should throw an error if callback is missing', function() {
      assert.throws(function() {
        buildRpm({});
      }, TypeError);
    });

    it('should throw an error if callback is not a function', function() {
      assert.throws(function() {
        buildRpm({}, '');
      }, TypeError);
    });

  });

  describe('rpm output', function() {

    after(function() {
      // remove temp folder left overs
      _.forEach(globby.sync('./rpm-builder-test-*'), function(dir) {
        if (fsx.existsSync(dir)) {
          fsx.removeSync(dir);
        }
      });
    });

    it('should keep the temp folder when `keepTemp: true`', function(done) {
      var options = {
        tempDir: 'rpm-builder-test-tmp-' + shortid.generate(),
        keepTemp: true
      };

      buildRpm(options, function(err, rpm) {
        if (err) {
          throw err;
        }

        var tmpDir = path.resolve(options.tempDir);
        assert(fsx.existsSync(tmpDir));

        // remove generated rpm
        fsx.removeSync(path.resolve(rpm));

        // remove temp folder
        fsx.removeSync(tmpDir);

        done();
      });
    });

    it('should remove the temp folder when `keepTemp: false`', function(done) {
      var options = {
        tempDir: 'rpm-builder-test-tmp-' + shortid.generate(),
        keepTemp: false
      };

      buildRpm(options, function(err, rpm) {
        if (err) {
          throw err;
        }

        var tmpDir = path.resolve(options.tempDir);
        assert(!fsx.existsSync(tmpDir));

        // remove generated rpm
        fsx.removeSync(path.resolve(rpm));

        done();
      });
    });

    it('should create a proper rpm folder structure inside the temp dir', function(done) {
      var rpmStructure = ['BUILD', 'BUILDROOT', 'RPMS', 'SOURCES', 'SPECS', 'SRPMS'];
      var options = {
        tempDir: 'rpm-builder-test-tmp-' + shortid.generate(),
        keepTemp: true
      };

      buildRpm(options, function(err, rpm) {
        if (err) {
          throw err;
        }

        var tmpDir = path.resolve(options.tempDir);
        fsx.readdir(tmpDir, function(err, dirs) {
          if (err) {
            throw err;
          }

          assert(_.difference(rpmStructure, dirs).length, 0);

          // remove generated rpm
          fsx.removeSync(path.resolve(rpm));

          // remove temp folder
          fsx.removeSync(tmpDir);

          done();
        });

      });
    });

    it('rpm file should be copied to the `rpmDest`', function(done) {
      var options = {
        tempDir: 'rpm-builder-test-tmp-' + shortid.generate(),
        rpmDest: path.join(process.cwd(), 'test'),
        keepTemp: false
      };

      buildRpm(options, function(err, rpm) {
        if (err) {
          throw err;
        }

        assert(fsx.existsSync(path.resolve(rpm)));

        // remove generated rpm
        fsx.removeSync(path.resolve(rpm));

        done();
      });
    });

    it('rpm file should have correct name', function(done) {
      var options = {
        name: 'test-name',
        version: '23.02.87',
        release: '28',
        buildArch: 'noarch',
        tempDir: 'rpm-builder-test-tmp-' + shortid.generate(),
        keepTemp: false
      };

      buildRpm(options, function(err, rpm) {
        if (err) {
          throw err;
        }

        var expectedName = options.name + '-' + options.version + '-' + options.release + '.' + options.buildArch + '.rpm';
        var expectedPath = path.dirname(rpm);

        assert(fsx.existsSync(path.join(expectedPath, expectedName)));

        // remove generated rpm
        fsx.removeSync(path.resolve(rpm));

        done();
      });
    });

    it('rpm contents should be consistent with the respective spec file', function(done) {
      var options = {
        name: 'test-name',
        version: '23.02.87',
        release: '28',
        buildArch: 'noarch',
        files: [
          {src: 'index.js', dest: '/dist/'},
          {src: './lib/*', dest: '/dist/'},
          {cwd: './test', src: '*.js', dest: '/dist/'}
        ],
        excludeFiles: [
          './test/main.js'
        ],
        tempDir: 'rpm-builder-test-tmp-' + shortid.generate(),
        keepTemp: true
      };

      buildRpm(options, function(err, rpm) {
        if (err) {
          throw err;
        }

        var cmd = 'rpm -qpl ' + rpm;

        exec(cmd, {}, function rpmContents(err, stdout, stderr) {
          if (err) {
            throw err;
          }

          if (stderr) {
            console.warn('stderr:', stderr);
          }

          var contents = stdout.split('\n');
          var specFileName = options.name + '-' + options.version + '-' + options.release + '.' + options.buildArch + '.spec';
          var specFilePath = path.join(options.tempDir, 'SPECS', specFileName);

          fsx.readFile(specFilePath, {encoding: 'utf-8'}, function(err, data) {
            contents.forEach(function(file) {
              assert(data.indexOf(file) > -1);
            });

            // remove temp folder
            fsx.removeSync(path.resolve(options.tempDir));

            // remove generated rpm
            fsx.removeSync(path.resolve(rpm));

            done();
          });
        });
      });
    });

  });

});
