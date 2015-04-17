%define   _topdir /home/vagrant/rpm/code2/rpm2

Name: test2
Version: 0.0.0
Release: 1
Summary: No summary
License: MIT
BuildArch: noarch
Vendor: Vendor
Group: Development/Tools
URL: http://rictorres.com
Requires: node, npm

%description
No description

%post
chown -R sitestat:sitestat $RPM_INSTALL_PREFIX/renderer
chmod +x $RPM_INSTALL_PREFIX/renderer/nodejs/bin/*
chmod +x $RPM_INSTALL_PREFIX/renderer/phantomjs/bin/*

%files
"/dist/index.js"
"/dist/lib/logger.js"
"/dist/lib/spec.js"
"/dist/shortid/lib/encode.js"
"/dist/shortid/lib/random.js"
"/dist/shortid/lib/shortid.js"