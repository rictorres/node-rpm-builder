commit ae217969cf2c81fcffc4d94ffd791ed65e9e0140
Author: vagrant <vagrant@localhost.localdomain>
Date:   Mon Mar 2 22:50:43 2015 +0000

    Fix typo on README

commit 79fd8709b4d4df687439c719e2aeb3d4adebc442
Author: vagrant <vagrant@localhost.localdomain>
Date:   Mon Mar 2 22:47:46 2015 +0000

    Add usage examples. Closes #9
    
    - basic usage
    - globs
    - cwd
    - exclude files
    - post install script

commit 8c2481d8cca68ca0f8e4d3c4932e1239bae2173b
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Mon Mar 2 11:49:21 2015 +0000

    Better error handling
    
    When `src` or `dest` is missing from the `file`

commit 0eba2cb819389aa292ebc36d09aae8c8ef8b31f1
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Mon Mar 2 11:32:53 2015 +0000

    Fix out of scope issue
    
    `rpmDestination` variable was being defined inside a block,
    but being used out of it.

commit 5a37dd4439cbc52de9af0de7631c955d6667ef8d
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Mon Mar 2 11:26:16 2015 +0000

    Fix bug when more than one source and/or patch was defined
    
    When looping through sources/patchs, the array index was
    not being defined.

commit 104c77ac1231ddb4089886a3550dede0f908a1b9
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Mon Mar 2 11:20:56 2015 +0000

    Add proper comments to the main file

commit 6376ffae1a0fe24aa7ae49654a7e12978e45080d
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Mon Mar 2 09:18:18 2015 +0000

    Improve readability/maintainability
    
    Decouple functions to make the code more human friendly.

commit bd6c156adbfc45abec5c67453edb45294200dbe3
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Sun Mar 1 19:24:22 2015 +0000

    Update tests
    
    Make sure the RPM package is copied to the `rpmDest`

commit fc1102078fa895a21537f644ae07eb497855799c
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Fri Feb 27 12:29:03 2015 +0000

    Release v0.3.2

commit 4014f26f7dc1a801a8733e4fda9c3836d475481e
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Fri Feb 27 12:25:06 2015 +0000

    Fix bug with `options.rpmDest`
    
    RPM file should only be copied if `options.rpmDest` is truthy.

commit ab9e82df738227128c0ce1e15cd2c92963efe0ba
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Fri Feb 27 09:29:06 2015 +0000

    Add info about `rpmDest` option (rpm destionation)

commit dd78827c1292134e09be8cc8857469638b41d791
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Thu Feb 26 21:48:39 2015 +0000

    Add support for setting the RPM destination
    
    The RPM package file is copied to the destination folder

commit 47875291ac4e794d3f8a994ecfa50b28a783ae6c
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Thu Feb 26 21:39:08 2015 +0000

    Release v0.3.1

commit ff3f976d80011f4dd17b23440a72c9358a2c43cc
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Thu Feb 26 21:37:39 2015 +0000

    Remove unnecessary `console.log`

commit 3eac52e318b775acdd1775aff1bc7a7694ce7089
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Thu Feb 26 17:11:31 2015 +0000

    Add tests info to the README

commit 1fa138db35c68a267155fb7581d3bf7c355d3214
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Thu Feb 26 10:28:47 2015 +0000

    Add API info to the README

commit ae48af21a7c82d045c9455b30641b06214f37ad1
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Thu Feb 26 00:16:11 2015 +0000

    Fix issue with the temp folders when testing
    
    After the tests, some temp folder were not being removed

commit 2f21d067549095b66d2720befcc90f8593e78e61
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Thu Feb 26 00:00:50 2015 +0000

    Release v0.3.0

commit 2825782e84e3e89635c12bc0423f3c3f96d5469a
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Wed Feb 25 23:56:57 2015 +0000

    Add usage info to the README
    
    Include examples with the main options

commit d0d6809df94928b6feffd121e70643d0e67f6c83
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Wed Feb 25 23:54:31 2015 +0000

    Add support for excluding files
    
    Files can be excluded using the same patterns supported
    by node-glob(by)

commit 995cae0636b7a17e9323b72e208421b5409d91dd
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Wed Feb 25 22:46:57 2015 +0000

    Add "requirements" info to the README
    
    With information on how to install them

commit bce8837cdae635150f974a8f6ae8baa734d469cb
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Wed Feb 25 20:31:02 2015 +0000

    Add support for `cwd` option. Closes #5
    
    Files/folders should be copied taking into account the cwd,
    so the destination should be relative to the defined cwd.

commit bd25e945b1ed9e52538076c945582824f6e00f3f
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Tue Feb 24 08:38:06 2015 +0000

    Fix line endings

commit d525abfe0a36b8d7495eb9c5fc0fd5e0a90bb3f5
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Mon Feb 23 22:24:21 2015 +0000

    Update README.me with the new added spec tags

commit d03ec058cf86ef26c37cf4b849c6a7215a2c77ed
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Mon Feb 23 22:24:07 2015 +0000

    Add spec tag/options: Conflicts

commit 6d9071c3ce98e98a6930d070a821d5de6e66ed80
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Mon Feb 23 22:03:43 2015 +0000

    Add support for more spec tags/options
    
    URL, Prefix, Source, Patch, AutoReq, AutoProv, Requires,
    ExludeArch, ExclusiveArch, BuildRequires, %prep, %build,
    %install, %check, %clean, %pre, %post, %preun, %postun,
    %verifyScript

commit 0aa1636623de97fc8e26dedf566420dfcea51959
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Mon Feb 23 15:06:52 2015 +0000

    Add JSHint reporter: jshint-stylish
    
    Also, prevent `lint` script from exiting with a non-zero error code

commit 5f512d4ee04b5a6e67d8b50997c03b305f223347
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Mon Feb 23 15:01:40 2015 +0000

    Update README.md
    
    - Specify contents of the `rpm` var inside the `buildRpm` callback

commit a64cb91f2fd7481cd5ea28a6fe6b9cba1fe62cd4
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Mon Feb 23 15:00:09 2015 +0000

    Add JSHint
    
    - Lint index.js lib/*.js test/*.js
    - Fix minor lint issues

commit 7925e167198898331d188636e5c3b0e71503bbdf
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Mon Feb 23 14:41:08 2015 +0000

    Update package.json directives
    
    - Remove files directive as .npmignore will make it redundant
    - Update author url field

commit ad51d8d06773c1ef610651e8157f86dbea981f6f
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Mon Feb 23 14:32:11 2015 +0000

    Update supported engines
    
    Tested on Node.js >= 0.9.0 and io.js >= 1.0.0

commit 0cd3445502ca673fd0c0d65e4a1dbe152fea3398
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Mon Feb 23 13:56:16 2015 +0000

    Release v0.2.0
    
    - Add basic support for globs
    - Add tests
    - Minor improvements/fixes

commit 38bc81b4e31f04cdfb0def0a578419c0de5baf8c
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Mon Feb 23 13:53:55 2015 +0000

    Update .gitignore

commit 071ef99c2fb462033addf8a41a1e289d6fd029ca
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Mon Feb 23 13:53:06 2015 +0000

    Add tests for the main module

commit ba15a6ce642b89254c83f05ced2f531459a35b87
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Mon Feb 23 13:50:42 2015 +0000

    Update spec file name
    
    Release info was missing from the spec file name

commit 458ac229c24131032d2e7461ce4b5d16c3e4ba8b
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Mon Feb 23 12:14:52 2015 +0000

    Fix bug with the temp folder
    
    Fix bug where the temp folder was being removed before
    the RPM file was copied to the CWD.

commit a7d4dd5627362a1edcdc5065724f4b90f34007ac
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Mon Feb 23 12:10:47 2015 +0000

    Fix bug where files path were being printed incorrectly in the spec file

commit 7d2f1837b09c283aad8756e9e55bf011f2f9f04b
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Mon Feb 23 10:56:37 2015 +0000

    Better error handling

commit 3749a683ebad4380ae4a3adcde70cadfdb84758c
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Mon Feb 23 10:27:48 2015 +0000

    Minor code clean up

commit b3219e504f7600206346df5f57288cb4aa9786a4
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Sun Feb 22 10:53:54 2015 +0000

    Update tmp-* to the ignore list

commit daf9f23161a5ffb8dc39ad356f1aa563b9ba0de3
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Sun Feb 22 10:48:52 2015 +0000

    Improve tests for the RPM spec file

commit 7c25d6fb965c9f8b60c33eff1cb0136082351449
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Sun Feb 22 10:47:28 2015 +0000

    Add "Vendor" and "Group" to the RPM spec file

commit 343c363563db45b805d3e9ffccfc96727585792c
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Sun Feb 22 09:37:50 2015 +0000

    Add tests for the RPM spec file

commit dfc68d2c53c57690180dad7d11f25d5d26e7a082
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Sat Feb 21 15:07:14 2015 +0000

    Add basic support for globs

commit bad0d1be9953f4914ec8e721138cf8cf7a598881
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Sat Feb 21 15:05:01 2015 +0000

    Update usage info

commit f247381a29b7e1a9a06c3522fb2dcf1271075fcd
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Fri Feb 20 10:08:38 2015 +0000

    Add license

commit 4c14a7be90e5b851d9f3c44fa147e6f01e201860
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Thu Feb 19 09:18:56 2015 +0000

    Add type checking for "options" and "callback"

commit b3503867ff8393b7ecfec7f7949f1fe33d96efc5
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Wed Feb 18 23:42:45 2015 +0000

    Release v0.1.0

commit 4f586e5a219d7723679e7331785071625cb15649
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Wed Feb 18 23:42:07 2015 +0000

    Update instructions on README.md

commit e72a389b4a117dc1a078bff590b909175516c5f8
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Wed Feb 18 23:41:00 2015 +0000

    Add basic RPM packaging functionality

commit 37cef2b8dc5b8166ed95aad24c61f3f26864e44c
Author: Ricardo Torres <ricardo@rictorres.com.br>
Date:   Wed Feb 18 15:00:04 2015 +0000

    Initial commit
