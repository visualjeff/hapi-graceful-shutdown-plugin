'use strict';

const Hapi = require('@hapi/hapi');
const HapiGracefulShutdownPlugin = require('hapi-graceful-shutdown-plugin');

const server = new Hapi.Server({
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
