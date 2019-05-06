
## About hapi-graceful-shutdown-plugin

Another hapi plugin to facilitate graceful shutdowns caused by sigterm and sigint.  Updated to work with Hapi v17.  Older versions of the plugin support Hapi v16.

[![Build Status](https://travis-ci.org/visualjeff/hapi-graceful-shutdown-plugin.png)](https://travis-ci.org/visualjeff/hapi-graceful-shutdown-plugin)

## Install
```
npm install hapi-graceful-shutdown-plugin --save
```


## Usage

```js
'use strict';

const Hapi = require('@hapi/hapi');
const HapiGracefulShutdownPlugin = require('hapi-graceful-shutdown-plugin');

const server = new Hapi.Server({
    host: localhost,
    port: 3000
});

const startup = async () => {
    await server.register([{
        plugin: require('HapiGracefulShutdownPlugin'),
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
