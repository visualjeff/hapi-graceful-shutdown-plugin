'use strict';

const Code = require('code');
const Hapi = require('hapi');
const Lab = require('lab');

// Declare internals
const internals = {};

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('Hapi Graceful Shutdown', () => {

    it('schema validation passes', (done) => {

        const server = new Hapi.Server();
        server.connection();

        server.register({
            register: require('../'),
            options: {
                sigtermTimeout: 10,
                sigintTimeout: 3
            }
        }, (err) => {

            expect(err).to.be.undefined();
        });
        done();
    });

    it('schema validation fails because of extra option value', (done) => {

        const server = new Hapi.Server();
        server.connection();

        server.register({
            register: require('../'),
            options: {
                sigtermTimeout: 10,
                sigintTimeout: 3,
                dumb: 'foo'
            }
        }, (err) => {

            expect(err).to.be.an.instanceof(Error);
            expect(err.name).to.equal('ValidationError');
            expect(err.details[0].message).to.equal('"dumb" is not allowed');
        });
        done();
    });

});
