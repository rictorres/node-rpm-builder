# RPM Builder
Builds [RPM](http://www.rpm.org/) packages using [Node.js](http://nodejs.org/) / [io.js](https://iojs.org/).


## Installation
```
$ npm install rpm-builder
```


## Requirements
This module requires the `rpmbuild` tool to be installed:

### Linux
```
$ yum install rpmdevtools
```

### Mac OS X
I recommend using Homebrew. Please check this [quick guide](http://timperrett.com/2014/03/23/enabling-rpmbuild-on-mac-osx/).


## Usage

### Basic
```js
var buildRpm = require('rpm-builder');

var options = {
  name: 'my-project',
  version: '0.0.0',
  release: '1',
  buildArch: 'noarch',
  files: [
    // will output files to
    // /dist/dev/file1.txt
    // /dist/dev/file2.txt
    // /dist/dev/file3.txt
    // /dist/dev/img1.png
    // /dist/dev/img2.png
    // /dist/dev/img3.png
    {src: './dev/file1.txt', dest: '/dist/'},
    {src: './dev/file2.txt', dest: '/dist/'}
    {src: './dev/file3.txt', dest: '/dist/'}
    {src: './dev/img1.png', dest: '/dist/'}
    {src: './dev/img2.png', dest: '/dist/'}
    {src: './dev/img3.png', dest: '/dist/'}
  ]
};

buildRpm(options, function(err, rpm) {
  if (err) {
    throw err;
  }
  
  console.log(rpm);
  // /path/to/my-project-0.0.0-1.noarch.rpm
});
```

### CWD (current working directory)
The `cwd` attribute is used to define the working directory for an individual or set of files. When this attribute is set, `src` entries are relative to the `cwd` path.
```js
var options = {
  name: 'my-project',
  version: '0.0.0',
  release: '1',
  buildArch: 'noarch',
  files: [
    // will output files to
    // /dist/dev/file1.txt
    // /dist/dev/file2.txt
    // /dist/dev/file3.txt
    // /dist/img1.png
    // /dist/img2.png
    // /dist/img3.png
    {src: './dev/file1.txt', dest: '/dist/'},
    {src: './dev/file2.txt', dest: '/dist/'}
    {src: './dev/file3.txt', dest: '/dist/'}
    {cwd: './dev/', src: 'img1.png', dest: '/dist/'}
    {cwd: './dev/', src: 'img2.png', dest: '/dist/'}
    {cwd: './dev/', src: 'img3.png', dest: '/dist/'}
  ]
};
```

### Globs
Files can also be listed using the patterns that shell uses (we're relying on [globby](https://github.com/sindresorhus/globby) for this).
```js
var options = {
  name: 'my-project',
  version: '0.0.0',
  release: '1',
  buildArch: 'noarch',
  files: [
    // will output files to
    // /dist/dev/file1.txt
    // /dist/dev/file2.txt
    // /dist/dev/file3.txt
    {src: './dev/*.txt', dest: '/dist/'},
  ]
};
```

### Excluding files
```js
var options = {
  name: 'my-project',
  version: '0.0.0',
  release: '1',
  buildArch: 'noarch',
  files: [
    // will output files to
    // /dist/dev/img1.png
    // /dist/dev/img2.png
    // /dist/dev/img3.png
    {src: './dev/img1.png', dest: '/dist/'},
    {src: './dev/img2.png', dest: '/dist/'},
    {src: './dev/img3.png', dest: '/dist/'},
    {src: './dev/file1.txt', dest: '/dist/'},
    {src: './dev/file2.txt', dest: '/dist/'}
    {cwd: './dev/', src: 'file3.txt', dest: '/dist/'}
  ],
  excludeFiles: [
    './dev/*.txt'
  ]
};
```


## API

### buildRpm(options, callback)

#### `options`
Type: `Object`

#### `callback`
Type: `Function`

Args:
  - `err`: `null` || `Error`.
  - `rpm`: `String` || `null`, path to the created RPM package.


## Options

#### tempDir
`String` (default: `'tmp-<auto_gen_id>'`)

Sets the temporary path name that stores the folder structure required by the `rpmbuild` command. Note that this is used for setting up and building the package and does not affect the RPM itself.

#### keepTemp

`Boolean` (default: `false`)

If true will keep the temporary folder used to build the RPM. Useful for debugging.

#### rpmDest

`String` (default: `process.cwd()`)

After the RPM package is created, it'll be copied to the path specified here. If you don't want to copy the RPM package elsewhere just set it to `false`, but be warned that if `keepTemp === false` the whole folder will be removed, including the RPM package.

####  verbose

`Boolean` (default: `true`)

If true will log messages/progress to `stdout`. Useful for debugging.


### RPM Spec related

#### name
`String` (default: `'no-name'`)

Sets the name tag in the RPM package. It's also used in the RPM file name.

#### version
`String` (default: `'0.0.0'`)

Sets the version tag in the RPM package. It's also used in the RPM file name.

#### release
`String` | `Number` (default: `1`)

Sets the release tag in the RPM package. It's also used in the RPM file name.

#### buildArch
`String` (default: `'noarch'`)

Specifies the target architecture of the RPM package. It's also used in the RPM file name.

#### summary
`String` (default: `'No summary'`)

Sets the summary tag in the RPM package.

#### description
`String` (default: `'No description'`)

Sets the description directive section in the RPM package.

#### license
`String` (default: `'MIT'`)

Specifies the license tag in the RPM package.

#### vendor
`String` (default: `'Vendor'`)

Sets the vendor tag in the RPM package.

#### group
`String` (default: `'Development/Tools'`)

Specifies the group tag in the RPM package.

#### url
`String`

A URL to the project homepage or documentation of the project. Defined in the [spec-file specification](http://www.rpm.org/wiki/PackagerDocs/Spec#URL:andPackager:Tags).

#### prefix
`String`

This will specify the relocatable root of the package so that it may be relocated by the user at install time.  The manual entry for the [prefix tag](http://www.rpm.org/max-rpm/s1-rpm-reloc-prefix-tag.html) explains the use case quite well.

#### sources
`Array`

Used to specify the locations the source code is provided by the developer(s). (Read more about this tag)[http://www.rpm.org/max-rpm-snapshot/s1-rpm-inside-tags.html].

#### patches
`Array`

The patch tag is used to identify which patches are associated with the software being packaged. The patch files are kept in RPM's SOURCES directory, so only the name of the patch file should be specified.

#### autoReq, autoProv
`Boolean` (default: `true`)

These tags control automatic dependency processing while the package is being built.  Their default state of `true` is not a decision by this project but represents the default action taken by RPM.  When both `autoReq` and `autoProv` are set to `false`, the `AutoReqProv` tag will instead be used with a value of
`no` in the SPEC file.

### requires
`Array`

An array of packages that this package depends on (e.g. `["nodejs >= 0.10.22", "libpng"]`).

#### conflicts
`Array`

An array of packages that this package conflicts with (e.g. `["cobol", "sparta > 300"]`).

#### excludeArchs
`Array`

An array specifying which architectures to prevent the RPM from building on (e.g. `["sparc"]`).

#### exclusiveArchs
`Array`

An array specifying _only_ the architectures the RPM should build on (e.g. `["x86_64"]`).

#### buildRequires
`Array`

List of packages required for building (compiling) the program. You can specify a minimum version if necessary (e.g. `["ocaml >= 3.08"]`).

#### prepScript
`Array`

The first script that RPM executes during a build.  Each element in the array provided will be a line in the `%prep` directive block of the SPEC file.
[There are also some useful macros that can be used here](http://www.rpm.org/max-rpm-snapshot/s1-rpm-inside-macros.html).

#### buildScript
`Array`

The build script is run after the prep script.  Generally it is used for things like running `make`.

#### installScript
`Array`

The install script is run after the build script and is used for running the commands that perform installation related tasks.

#### checkScript
`Array`

The check script is run after the build script and is used for running the commands that perform installation checking tasks (test suites, etc.)

#### cleanScript
`Array`

The clean script is used to clean up the build directory tree.  RPM usually does this automatically but this is especially useful for packages that specify a `buildRoot`.

#### preInstallScript
`Array`

An array of commands to be executed before the installation. Each element in the array represents a command.

#### postInstallScript
`Array`

An array of commands to be executed after the installation. Each element in
the array represents a command.

#### preUninstallScript
`Array`

An array of commands to be executed before uninstallation. Each element in the array represents a command.

#### postUninstallScript
`Array`

An array of commands to be executed after uninstallation. Each element in the array represents a command.

#### verifyScript
`Array`

This script is executed whenever the installed package is verified by RPMs verification command.  Effectively, it should be used to verify the the correct installation of the package.  Note that RPM already verifies the existence of the package's files along with their file attributes.  Thus, the contents of this script should focus on other aspects of the installation.


## Tests
```
$ npm test
```


## License

[MIT](http://rictorres.mit-license.org/) © [Ricardo Torres](http://rictorres.com)
