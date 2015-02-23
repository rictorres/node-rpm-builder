'use strict';

var assert = require('assert');
var fsx = require('fs-extra');
var path = require('path');
var shortid = require('shortid');

var writeSpec = require('../lib/spec.js');

describe('spec', function() {

  describe('spec init', function() {

    it('should throw an error if files array is missing', function() {
      assert.throws(writeSpec, TypeError);
    });

    it('should throw an error if files is not an array', function() {
      assert.throws(function() {
        writeSpec('');
      }, TypeError);
    });

    it('should throw an error if options object is missing', function() {
      assert.throws(function() {
        writeSpec([]);
      }, TypeError);
    });

    it('should throw an error if options is not an object', function() {
      assert.throws(function() {
        writeSpec([], '');
      }, TypeError);
    });

  });

  describe('spec output', function() {
    var specFile;
    var files = [
      path.join(__dirname, 'index.js'),
      path.join(__dirname, 'package.json'),
      path.join(__dirname, 'README.md')
    ];
    var options = {
      name: 'test',
      summary: 'test summary',
      description: 'test description',
      version: '0.0.0',
      release: '1',
      license: 'MIT',
      vendor: 'Vendor',
      group: 'Development/Tools',
      buildArch: 'noarch',
      tempDir: 'tmp-' + shortid.generate(),
      files: [],
      keepTemp: false
    };
    var specDir = path.join(options.tempDir, 'SPECS');

    before(function() {
      fsx.mkdirpSync(specDir);
      specFile = writeSpec(files, options);
    });

    after(function() {
      fsx.removeSync(options.tempDir);
    });

    it('should create a spec file', function(done) {
      fsx.readFile(specFile, {encoding: 'utf-8'}, function(err, data) {
        assert.strictEqual(err, null);
        assert(data);
        done();
      });
    });

    it('should have correct file name', function() {
      var specFileName = options.name + '-' + options.version + '-' + options.release + '.' + options.buildArch + '.spec';
      assert.strictEqual(path.basename(specFile), specFileName);
    });

    it('should have options properly specified', function(done) {
      var opts = [
        'name',
        'summary',
        'description',
        'version',
        'release',
        'license',
        'vendor',
        'group',
        'buildArch'
      ];

      fsx.readFile(specFile, {encoding: 'utf-8'}, function(err, data) {
        opts.forEach(function(key) {
          assert(data.indexOf(options[key]) > -1);
        });
        done();
      });
    });

    it('should have %files block defined', function(done) {
      fsx.readFile(specFile, {encoding: 'utf-8'}, function(err, data) {
        assert(data.indexOf('%files') > -1);
        done();
      });
    });

    it('should have all files defined', function(done) {
      fsx.readFile(specFile, {encoding: 'utf-8'}, function(err, data) {
        files.forEach(function(file) {
          assert(data.indexOf(file) > -1);
        });
        done();
      });
    });

  });

});
