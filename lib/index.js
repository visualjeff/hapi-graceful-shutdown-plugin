'use strict';

const Joi = require('@hapi/joi');

// Declare internals
const internals = {};

// JOI Schema for validation
internals.schema = Joi.object().keys({
    sigtermTimeout: Joi.number().default(1),
    sigintTimeout: Joi.number().default(1)
});

exports.plugin = {
    pkg: require('../package.json'),
    register: (server, options) => {

        // Validate options agains the JOI scheam above
        const validateOptions = internals.schema.validate(options);
        if (validateOptions.error) {
            throw validateOptions.error;
        }

        const sigtermStop = async () => {
            // $lab:coverage:off$
            try {
                await server.stop({
                    timeout: options.sigtermTimeout * 1000
                });
                process.exit(0);
            } catch (err) {
                process.exit(1);
            }
            // $lab:coverage:on$
        };

        const sigintStop = async () => {
            // $lab:coverage:off$
            try {
                await server.stop({
                    timeout: options.sigintTimeout * 1000
                });
                process.exit(0);
            } catch (err) {
                process.exit(1);
            }
            // $lab:coverage:on$
        };

        process.on('SIGTERM', sigtermStop);
        process.on('SIGINT', sigintStop);
    }
};
