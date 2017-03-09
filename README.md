
## About hapi-graceful-shutdown-plugin

Another hapi plugin to facilitate graceful shutdowns caused by sigterm and sigint.

[![Build Status](https://travis-ci.org/visualjeff/hapi-graceful-shutdown-plugin.png)](https://travis-ci.org/visualjeff/hapi-graceful-shutdown-plugin)

## Install
```
npm install hapi-graceful-shutdown-plugin --save
```


## Usage

```js
'use strict';

const Hapi = require('hapi');
const HapiGracefulShutdownPlugin = require('hapi-graceful-shutdown-plugin');

const server = new Hapi.Server();

server.connection({
    port: 3000
});

server.register([{
    register: require('HapiGracefulShutdownPlugin'),
    options: {
        sigtermTimeout: 10,
        sigintTimeout: 1
    }
}], (err) => {

    if (err) {
        throw err;
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }

    console.dir('Server running at: ' + server.info.uri, {
        colors: true
    });
});
```
