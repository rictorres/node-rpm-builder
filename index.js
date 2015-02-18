'use strict';

var fs = require('path');
var path = require('path');
var shortid = require('shortid');
var _ = require('lodash');

module.exports = build;

function build(opts, cb) {
  if (!opts) {
    var err = new Error('Options must be defined');
    return cb(err);
  }

  _.defaults(opts, {
    name: 'no-name',
    summary: 'No summary',
    description: 'No description',
    version: '0.0.0',
    release: '1',
    license: 'MIT',
    vendor: 'Vendor',
    group: 'Development/Tools',
    buildArch: 'noarch',
    tempDir: 'tmp-' + shortid.generate()
  });

  cb(null, opts);
}

