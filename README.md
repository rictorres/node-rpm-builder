# RPM Builder
Build a RPM package using Node.js.


## Installation
```
$ npm install rpm-builder
```


## Usage
```js
var buildRpm = require('rpm-builder');

var options = {
  name: 'my-project',
  summary: 'My summary',
  description: 'My description',
  version: '0.0.0',
  release: '1',
  license: 'MIT',
  vendor: 'Vendor',
  group: 'Development/Tools',
  buildArch: 'noarch',
  tempDir: './tmp'
}

buildRpm(options, function(err, result) {
  if (err) {
    throw err;
  }
  
  console.log(result);
});
```


## Options

### name
`String` (default: `'no-name'`)

Sets the name tag in the RPM package. It's also used in the RPM file name.


### version
`String` (default: `'0.0.0'`)

Sets the version tag in the RPM package. It's also used in the RPM file name.

### release
`String` | `Number` (default: `1`)

Sets the release tag in the RPM package. It's also used in the RPM file name.

### buildArch
`String` (default: `'noarch'`)

Specifies the target architecture of the RPM package. It's also used in the RPM file name.

### summary
`String` (default: `'No summary'`)

Sets the summary tag in the RPM package.

### description
`String` (default: `'No description'`)

Sets the description directive section in the RPM package.

### license
`String` (default: `'MIT'`)

Specifies the license tag in the RPM package.

### vendor
`String` (default: `'Vendor'`)

Sets the vendor tag in the RPM package.

### group
`String` (default: `'Development/Tools'`)

Specifies the group tag in the RPM package.

### tempDir
`String` (default: `'tmp-<auto_gen_id>'`)

Sets the temporary path name that stores the folder structure required by the `rpmbuild` command. Note that this is used for setting up and building the package and does not affect the RPM itself.

### keepTemp

`Boolean` (default: `false`)

If true will keep the temporary folder used to build the RPM. Useful for debugging.


## Versioning

For transparency and insight into our release cycle, and for striving to maintain backward compatibility, this app will be maintained under the Semantic Versioning guidelines as much as possible.

Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backward compatibility bumps the major (and resets the minor and patch)
* New additions without breaking backward compatibility bumps the minor (and resets the patch)
* Bug fixes and misc changes bumps the patch

For more information on SemVer, please visit [http://semver.org/](http://semver.org/).

## Author

**Ricardo Torres**


## License

[MIT License](http://rictorres.mit-license.org/)
