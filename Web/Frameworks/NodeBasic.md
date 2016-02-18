<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Node Basic Notes](#node-basic-notes)
	- [Directory Path](#directory-path)
	- [Lib/Plugins](#libplugins)

<!-- /TOC -->

# Node Basic Notes

## Directory Path

-   Main                        ./index.js, ./server.js, or ./yourentryfile.js in the root
-   Supporting files in         ./lib/
-   Static HTTP files in        ./public/
-   Views or templates in       ./views/
-   Command-line executables in ./bin/
-   Tests in                    ./test/ (or ./spec/ if you’re a Jasmine cool-aid drinker)
-   npm scripts in              ./scripts/
-   Config in                   ./config/
-   Documentation in            ./doc/
-   Examples in                 ./examples/
-   Performance analysis in     ./benchmarks/
-   Native C/C++ source in      ./source/

## Lib/Plugins


-   Mout Like  Underscore/Lo-Dash, stuff that should probably be included in JavaScript
-   Express    Web-application framework
-   Q          Promises
-   Qconf      Application config
-   Credential Safe password hashing
-   Hogan      Mustache for Express
-   Superagent Communicate with APIs
-   Socket.io  Realtime communications (WebSocket)
-   Async      Asynchronous functional utilities
-   Bunyan     Logging
-   Tape       Testing
-   Cuid       Better than GUID/UUID for web applications
