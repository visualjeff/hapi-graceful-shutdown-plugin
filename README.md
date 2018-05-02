
## About hapi-graceful-shutdown-plugin

Another hapi plugin to facilitate graceful shutdowns caused by sigterm and sigint.  Updated to work with Hapi v17.  Older versions of the plugin support Hapi v16.

[![Build Status](https://travis-ci.org/visualjeff/hapi-graceful-shutdown-plugin.png)](https://travis-ci.org/visualjeff/hapi-graceful-shutdown-plugin)
[![bitHound Overall Score](https://www.bithound.io/github/visualjeff/hapi-graceful-shutdown-plugin/badges/score.svg)](https://www.bithound.io/github/visualjeff/hapi-graceful-shutdown-plugin)
[![bitHound Dependencies](https://www.bithound.io/github/visualjeff/hapi-graceful-shutdown-plugin/badges/dependencies.svg)](https://www.bithound.io/github/visualjeff/hapi-graceful-shutdown-plugin/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/visualjeff/hapi-graceful-shutdown-plugin/badges/devDependencies.svg)](https://www.bithound.io/github/visualjeff/hapi-graceful-shutdown-plugin/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/visualjeff/hapi-graceful-shutdown-plugin/badges/code.svg)](https://www.bithound.io/github/visualjeff/hapi-graceful-shutdown-plugin)

## Install
```
npm install hapi-graceful-shutdown-plugin --save
```


## Usage

```js
'use strict';

const Hapi = require('hapi');
const HapiGracefulShutdownPlugin = require('hapi-graceful-shutdown-plugin');

const server = new Hapi.Server({
    host: localhost,
    port: 3000
});

const startup = async () => {
    await server.register([{
        plugin: HapiGracefulShutdownPlugin,
        options: {
            sigtermTimeout: 10,
            sigintTimeout: 1
        }
    }]);
    await server.start();
};

startup().catch((err) => {
    throw err;
});

console.log(`${new Date()}: server running at ${server.info.uri}`);
```
