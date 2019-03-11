'use strict';
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
    // /dist/img1.png
    // /dist/img2.png
    // /dist/img3.png
    {src: './dev/file1.txt', dest: '/dist/'},
    {src: './dev/file2.txt', dest: '/dist/'},
    {src: './dev/file3.txt', dest: '/dist/'},
    {cwd: './dev/', src: 'img1.png', dest: '/dist/'},
    {cwd: './dev/', src: 'img2.png', dest: '/dist/'},
    {cwd: './dev/', src: 'img3.png', dest: '/dist/'}
  ]
};

buildRpm(options, function(err, rpm) {
  if (err) {
    throw err;
  }

  console.log(rpm);
  // /path/to/my-project-0.0.0-1.noarch.rpm
});
