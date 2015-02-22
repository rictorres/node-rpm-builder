'use strict';

var assert = require('assert');
var fsx = require('fs-extra');
var path = require('path');
var shortid = require('shortid');

var buildRpm = require('../');
var spec = require('../lib/spec.js');

describe('spec', function() {

  describe('spec init', function() {

    it('should throw an error if files array is missing', function() {
      assert.throws(spec, TypeError);
    });

    it('should throw an error if files is not an array', function() {
      assert.throws(function() {
        spec('');
      }, TypeError);
    });

    it('should throw an error if options object is missing', function() {
      assert.throws(function() {
        spec([]);
      }, TypeError);
    });

    it('should throw an error if options is not an object', function() {
      assert.throws(function() {
        spec([], '');
      }, TypeError);
    });

  });

});
