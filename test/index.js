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

    it('schema validation passes', () => {

        const server = new Hapi.Server();
        const register = async () => {

            await server.register([{
                plugin: require('../'),
                options: {
                    sigtermTimeout: 10,
                    sigintTimeout: 3
                }
            }]);
        };

        register().catch((err) => {

            expect(err).to.be.undefined();
        });
    });

    it('schema validation fails because of extra option value', () => {

        const server = new Hapi.Server();
        const register = async () => {

            await server.register([{
                plugin: require('../'),
                options: {
                    sigtermTimeout: 10,
                    sigintTimeout: 3,
                    dumb: 'foo'
                }
            }]);
        };

        register().catch((err) => {

            expect(err).to.be.an.instanceof(Error);
            expect(err.name).to.equal('ValidationError');
            expect(err.details[0].message).to.equal('"dumb" is not allowed');
        });
    });

});
