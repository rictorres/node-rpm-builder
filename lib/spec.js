'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

module.exports = function(files, options) {
  if (!files || !Array.isArray(files)) {
    throw new TypeError('Missing files array');
  }

  if (!options || typeof options !== 'object') {
    throw new TypeError('Missing options object');
  }

  var pkgName = options.name + '-' + options.version + '-' + options.release + '.' + options.buildArch;
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

  if (options.vendor && options.vendor.length > 0) {
    b.push('Vendor: ' + options.vendor);
  }

  if (options.group && options.group.length > 0) {
    b.push('Group: ' + options.group);
  }

  if (options.url && options.url.length > 0) {
    b.push('URL: ' + options.url);
  }

  if (options.prefix && options.prefix.length > 0) {
    b.push('Prefix: ' + options.prefix);
  }

  if (options.sources && Array.isArray(options.sources) && options.sources.length > 0) {
    if (options.sources.length === 1) {
      b.push('Source: ' + options.sources[0]);
    }
    else {
      _.forEach(options.sources, function(src, idx) {
        b.push('Source' + idx + ': ' + src);
      });
    }
  }

  if (options.patches && Array.isArray(options.patches) && options.patches.length > 0) {
    if (options.patches.length === 1) {
      b.push('Patch: ' + options.patches[0]);
    }
    else {
      _.forEach(options.patches, function(src, idx) {
        b.push('Patch' + idx + ': ' + src);
      });
    }
  }

  if (options.autoReq === false && options.autoProv === false) {
    b.push('AutoReqProv: no');
  } else if (options.autoReq === false) {
    b.push('AutoReq: no');
  } else if (options.autoProv === false) {
    b.push('AutoProv: no');
  }

  if (options.requires && Array.isArray(options.requires) && options.requires.length > 0) {
    b.push('Requires: ' + options.requires.join(', '));
  }

  if (options.conflicts && Array.isArray(options.conflicts) && options.conflicts.length > 0) {
    b.push('Conflicts: ' + options.conflicts.join(', '));
  }

  if (options.excludeArchs && Array.isArray(options.excludeArchs) && options.excludeArchs.length > 0) {
    b.push('ExcludeArch: ' + options.excludeArchs.join(', '));
  }

  if (options.exclusiveArchs && Array.isArray(options.exclusiveArchs) && options.exclusiveArchs.length > 0) {
    b.push('ExclusiveArch: ' + options.exclusiveArchs.join(', '));
  }

  if (options.buildRequires && Array.isArray(options.buildRequires) && options.buildRequires.length > 0) {
    _.forEach(options.buildRequires, function(str) {
      b.push('BuildRequires: ' + str);
    });
  }

  b.push('');

  b.push('%description');
  b.push(options.description);
  b.push('');

  if (options.prepScript && Array.isArray(options.prepScript) && options.prepScript.length > 0) {
    b.push('%prep');
    b.push(options.prepScript.join('\n'));
    b.push('');
  }

  if (options.buildScript && Array.isArray(options.buildScript) && options.buildScript.length > 0) {
    b.push('%build');
    b.push(options.buildScript.join('\n'));
    b.push('');
  }

  if (options.installScript && Array.isArray(options.installScript) && options.installScript.length > 0) {
    b.push('%install');
    b.push(options.installScript.join('\n'));
    b.push('');
  }

  if (options.checkScript && Array.isArray(options.checkScript) && options.checkScript.length > 0) {
    b.push('%check');
    b.push(options.checkScript.join('\n'));
    b.push('');
  }

  if (options.cleanScript && Array.isArray(options.cleanScript) && options.cleanScript.length > 0) {
    b.push('%clean');
    b.push(options.cleanScript.join('\n'));
    b.push('');
  }

  if (options.preInstallScript && Array.isArray(options.preInstallScript) && options.preInstallScript.length > 0) {
    b.push('%pre');
    b.push(options.preInstallScript.join('\n'));
    b.push('');
  }

  if (options.postInstallScript && Array.isArray(options.postInstallScript) && options.postInstallScript.length > 0) {
    b.push('%post');
    b.push(options.postInstallScript.join('\n'));
    b.push('');
  }

  if (options.preUninstallScript && Array.isArray(options.preUninstallScript) && options.preUninstallScript.length > 0) {
    b.push('%preun');
    b.push(options.preUninstallScript.join('\n'));
    b.push('');
  }

  if (options.postUninstallScript && Array.isArray(options.postUninstallScript) && options.postUninstallScript.length > 0) {
    b.push('%postun');
    b.push(options.postUninstallScript.join('\n'));
    b.push('');
  }

  if (options.verifyScript && Array.isArray(options.verifyScript) && options.verifyScript.length > 0) {
    b.push('%verifyscript');
    b.push(options.verifyScript.join('\n'));
    b.push('');
  }

  b.push('%files');
  _.forEach(files, function(file) {
    var directive = (file.directive == undefined) ? '' : '%' + file.directive + ' ';
    b.push(directive + '"' + file.path + '"');
  });

  var specFileContent = b.join('\n');
  fs.writeFileSync(specFile, specFileContent);

  return specFile;
};
