/* global describe, it, before, after */

import assert from "assert";
import fsx from "fs-extra";
import path from "path";
import _ from "lodash";
import dateFormat from "dateformat";
import writeSpec from "../lib/spec.js";
import { fileURLToPath } from 'url';
import {nanoid} from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('spec', function () {

  describe('spec init', function () {

    it('should throw an error if files array is missing', function () {
      assert.throws(writeSpec, TypeError);
    });

    it('should throw an error if files is not an array', function () {
      assert.throws(function () {
        writeSpec('');
      }, TypeError);
    });

    it('should throw an error if options object is missing', function () {
      assert.throws(function () {
        writeSpec([]);
      }, TypeError);
    });

    it('should throw an error if options is not an object', function () {
      assert.throws(function () {
        writeSpec([], '');
      }, TypeError);
    });

  });

  describe('spec output', function () {
    let specFile;
    const files = [
      {path: path.join(__dirname, 'index.js')},
      {path: path.join(__dirname, 'package.json')},
      {path: path.join(__dirname, 'README.md'), directive: 'config'}
    ];
    const options = {
      name: 'test',
      summary: 'test summary',
      description: 'test description',
      version: '0.0.0',
      release: '1',
      epoch: '22',
      license: 'MIT',
      vendor: 'Vendor',
      group: 'Development/Tools',
      buildArch: 'noarch',
      tempDir: 'tmp-' + nanoid(16),
      files: [],
      keepTemp: false
    };
    const specDir = path.join(options.tempDir, 'SPECS');

    before(function () {
      fsx.mkdirpSync(specDir);
      specFile = writeSpec(files, options);
    });

    after(function () {
      fsx.removeSync(options.tempDir);
    });

    it('should create a spec file', function (done) {
      fsx.readFile(specFile, {encoding: 'utf-8'}, function (err, data) {
        assert.strictEqual(err, null);
        assert(data);
        done();
      });
    });

    it('should have correct file name', function () {
      const specFileName = options.name + '-' + options.version + '-' + options.release + '.' + options.buildArch + '.spec';
      assert.strictEqual(path.basename(specFile), specFileName);
    });

    it('should have options properly specified', function (done) {
      const opts = [
        'name',
        'summary',
        'description',
        'version',
        'release',
        'epoch',
        'license',
        'vendor',
        'group',
        'buildArch'
      ];

      fsx.readFile(specFile, {encoding: 'utf-8'}, function (err, data) {
        opts.forEach(function (key) {
          assert(data.indexOf(options[key]) > -1);
        });
        done();
      });
    });

    it('should have %files block defined', function (done) {
      fsx.readFile(specFile, {encoding: 'utf-8'}, function (err, data) {
        assert(data.indexOf('%files') > -1);
        done();
      });
    });

    it('should have all files defined', function (done) {
      fsx.readFile(specFile, {encoding: 'utf-8'}, function (err, data) {
        files.forEach(function (file) {
          assert(data.indexOf(file.path) > -1);
          if (Object.prototype.hasOwnProperty.call(file, 'directive')) {
            const directiveLine = '%config "' + file.path + '"';
            assert(data.indexOf(directiveLine) > -1);
          }
        });
        done();
      });
    });

    it('should check an epoch parameter', function (done) {
      fsx.readFile(specFile, {encoding: 'utf-8'}, function (err, data) {
        const epochMatchResultArr = /Epoch: (\d+)/gm.exec(data);
        if (/Epoch: (\d+)/gm.test(data)) {
          assert.strictEqual(epochMatchResultArr[1], options.epoch);
        } else {
          assert.strictEqual(epochMatchResultArr, null);
        }
        done();
      });
    });

    describe('packager option', function () {
      const options = {
        name: 'test',
        version: '0.0.0',
        release: '1',
        buildArch: 'noarch',
        tempDir: 'tmp-dir'
      };
      const specDir = path.join(options.tempDir, 'SPECS');
      const RE_PACKAGER = /Packager:(.*)/;

      before(function () {
        fsx.mkdirpSync(specDir);
      });

      after(function () {
        fsx.removeSync(options.tempDir);
      });

      it('should be optional', function (done) {
        specFile = writeSpec([], options);

        fsx.readFile(specFile, {encoding: 'utf-8'}, function (err, data) {
          if (err) {
            done(err);
          }
          assert(data.match(RE_PACKAGER) === null, 'Packager is present in spec');
          done();
        });
      });

      it('should be contained in spec if specified', function (done) {
        const packager = 'John Foo <john@foo.com>';
        specFile = writeSpec([], _.extend({}, options, {
          packager: packager
        }));

        fsx.readFile(specFile, {encoding: 'utf-8'}, function (err, data) {
          if (err) {
            done(err);
          }
          const matches = data.match(RE_PACKAGER);
          assert(matches !== null, 'Packager is missing in spec');
          assert(matches.length > 1, 'Packager line is corrupted in spec');
          assert(matches[1].indexOf(packager) > -1, 'Packager value is missing in spec');
          done();
        });
      });
    });

    describe('changelog option', function () {
      const options = {
        name: 'test',
        version: '0.0.0',
        release: '1',
        buildArch: 'noarch',
        tempDir: 'tmp-dir'
      };
      const specDir = path.join(options.tempDir, 'SPECS');
      const RE_CHANGELOG = /%changelog([\s\S]*)/m;

      function formatChangelogDate(date) {
        return dateFormat(date, 'ddd mmm dd yyyy');
      }

      before(function () {
        fsx.mkdirpSync(specDir);
      });

      after(function () {
        fsx.removeSync(options.tempDir);
      });

      it('should be optional', function (done) {
        specFile = writeSpec([], options);

        fsx.readFile(specFile, {encoding: 'utf-8'}, function (err, data) {
          if (err) {
            done(err);
          }
          assert(data.match(RE_CHANGELOG) === null, '%changelog is present in spec');
          done();
        });
      });
      it('should ignore empty array', function (done) {
        const changelog = [];
        specFile = writeSpec([], _.extend({}, options, {
          changelog: changelog
        }));

        fsx.readFile(specFile, {encoding: 'utf-8'}, function (err, data) {
          if (err) {
            done(err);
          }
          assert(data.match(RE_CHANGELOG) === null, '%changelog is present in spec');
          done();
        });
      });
      it('should be contained in spec if contains entries', function (done) {
        const changelog = [
          {
            date: new Date('1995-12-17T03:24:00'),
            author: 'John Foo <john@foo.com>',
            changes: [
              'updated core library to 1.5.2',
              'fixed API method `listUserContacts`'
            ]
          },
          {
            date: new Date('1995-12-19T03:24:00'),
            author: 'John Foo <john@foo.com>',
            changes: [
              'established DB queries cache'
            ]
          }
        ];
        specFile = writeSpec([], _.extend({}, options, {
          changelog: changelog
        }));

        fsx.readFile(specFile, {encoding: 'utf-8'}, function (err, data) {
          if (err) {
            done(err);
          }
          const matches = data.match(RE_CHANGELOG);
          assert(matches !== null, '%changelog is missing in spec');
          assert(matches.length > 1, '%changelog entries are corrupted');
          changelog.forEach(function (entry) {
            const expectedEntryHeader = ('* ' + formatChangelogDate(entry.date) + ' ' + entry.author);
            assert(matches[1].indexOf(expectedEntryHeader) > -1,
              'Changelog entry header has different format. Expecting: \'' + expectedEntryHeader + '\'');
            entry.changes.forEach(function (change) {
              assert(matches[1].indexOf('- ' + change) > -1, 'Change entry ' + change + ' is missing in spec');
            });
          });
          done();
        });
      });
    });
  });
});
