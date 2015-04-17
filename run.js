var buildRpm = require('./');

var options = {
  name: 'test2',
  files: [
    {src: 'index.js', dest: '/dist/'},
    {src: './lib/*', dest: '/dist/'},
    {cwd: './node_modules/', src: 'shortid/lib/*', dest: '/dist/'},
    {cwd: './node_modules/', src: 'async/*', dest: '/dist/'}
  ],
  excludeFiles: [
    './node_modules/shortid/lib/alphabet.js',
    './node_modules/async/*.json'
  ],
  tempDir: 'rpm2',
  keepTemp: true,
  verbose: true,
  // rpmDest: '/home/vagrant',

  url: 'http://rictorres.com',
  requires: ['node', 'npm'],
  postInstallScript: [
    'chown -R sitestat:sitestat $RPM_INSTALL_PREFIX/renderer',
    'chmod +x $RPM_INSTALL_PREFIX/renderer/nodejs/bin/*',
    'chmod +x $RPM_INSTALL_PREFIX/renderer/phantomjs/bin/*'
  ]
  // buildRequires: ['node > 0.9.0', 'npm > 1.4']
};

buildRpm(options, function(err, rpm) {
  if (err) {
    throw err;
  }
  else {
    console.log('Done:', rpm);
  }
});

// var options = {
//   cwd: './',
//   rpmDest: __dirname,
//   rpmRootDir: path.join(__dirname, 'rpm'),
//   buildArch: 'noarch',
//   specTemplate: path.join(__dirname, PATHS.LIB, 'build', 'rpm-template.spec'),
//   name: 'dax-core-canvas',
//   summary: 'Canvas RPM',
//   description: 'this is a RPM for Canvas',
//   version: _svnInfo.branch,
//   release: _svnInfo.revision,
//   url: 'http://dax.comscore.eu/',
//   license: '',
//   prefix: '/sitestat/htdocs',
//   group: 'Development/Tools',
//   files: {
//     '/sitestat/htdocs/canvas': ['dist/**']
//   },
//   installScript: [
//     'chown -R sitestat:sitestat $RPM_INSTALL_PREFIX/canvas'
//   ],
//   requires: [],
//   verbose: false
// };

// rpm.build(options, function(err, result) {
//   if (err) {
//     gutil.log(gutil.colors.red('node-build-rpm error: '), err);
//     return cb(err);
//   } else {
//     gutil.log(gutil.colors.green('RPM successfully created: '), result.rpms.rpm);
//     cb();
//   }
// });
