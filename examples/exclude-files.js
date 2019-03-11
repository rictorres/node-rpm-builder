'use strict';
var buildRpm = require('rpm-builder');

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
    {src: './dev/file2.txt', dest: '/dist/'},
    {cwd: './dev/', src: 'file3.txt', dest: '/dist/'}
  ],
  excludeFiles: [
    './dev/*.txt'
  ]
};

buildRpm(options, function(err, rpm) {
  if (err) {
    throw err;
  }

  console.log(rpm);
  // /path/to/my-project-0.0.0-1.noarch.rpm
});
