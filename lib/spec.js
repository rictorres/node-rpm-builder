'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(files, options) {
  var pkgName = options.name + '-' + options.version + '-' + options.buildArch;
  var specFile = path.join(options.tempDir, 'SPECS', pkgName + '.spec');

  var b = [];

  b.push('%define   _topdir ' + path.resolve(options.tempDir));
  b.push('');
  b.push('Name: ' + options.name);
  b.push('Version: ' + options.version);
  b.push('Release: ' + options.release);
  b.push('Summary: ' + options.summary);
  b.push('License: ' + options.license);
  b.push('BuildArch: ' + options.buildArch);
  b.push('');
  b.push('%description');
  b.push(options.description);
  b.push('');
  b.push('%files');

  for (var i = 0, len = files.length; i < len; i++) {
    b.push('"' + files[i] + '"');
  }

  var specFileContent = b.join('\n');
  fs.writeFileSync(specFile, specFileContent);

  return specFile;
}
