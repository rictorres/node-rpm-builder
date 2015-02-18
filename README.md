# RPM Builder
Build a RPM package using Node.js.


## Installation
```
$ npm install node-rpm-builder
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

Used to set at the name tag in your RPM package and also used in the
construction of the RPM file name.


### version
`String` (default: `'0.0.0'`)

Used to set the version tag in your RPM package and also used in the
construction of the RPM file name.

### release
`String` | `Number` (default: `1`)

Used to set the release tag in your RPM package and also used in the
construction of the RPM file name.

### buildArch
`String` (default: `'noarch'`)

A string value that is used to set specify the target architecture of your RPM
package. This value is also used in the construction of the RPM file name.

### summary
`String` (default: `'No summary'`)

Used to set the summary tag in your RPM package.

### description
`String` (default: `'No description'`)

Used to set the description directive section in your RPM package.

### license
`String` (default: `'MIT'`)

Used to specify the license tag in your RPM package.

### vendor
`String` (default: `'Vendor'`)

Used to set the vendor tag in your RPM package.

### group
`String` (default: `'Development/Tools'`)

Used to specify the group tag in your RPM package.

### tempDir
`String` (default: `'tmp-<auto_gen_id>'`)

Sets the temporary path name that stores the structure that required by the rpmbuild command. Note that this is used for the setup and building of the package and does not affect the RPM itself.


## Why?
This project started as a fork of [rpmbuild](https://github.com/azweb76/node-rpmbuild) which was broken and couldn't suit my needs, but then I realised it was better to write it from scratch. There are other projects that does the same thing but they [are](https://github.com/gastonelhordoy/grunt-rpm/) [all](https://github.com/plessbd/grunt-build-rpm) Grunt plugins. If Grunt integration is what you need, I really recommend [easy-rpm](https://github.com/panitw/easy-rpm).

## Contributing