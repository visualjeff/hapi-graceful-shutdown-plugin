'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
    port: 3000
});

server.register([{
    register: require('../'),
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
