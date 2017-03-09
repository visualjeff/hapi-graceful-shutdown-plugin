'use strict';

const Joi = require('joi');

// Declare internals
const internals = {};

// JOI Schema for validation
internals.schema = Joi.object().keys({
    sigtermTimeout: Joi.number().default(1),
    sigintTimeout: Joi.number().default(1)
});

const hapiGracefulShutdownPlugin = {
    register: (server, options, next) => {

        // Validate options agains the JOI scheam above
        const validateOptions = internals.schema.validate(options);
        if (validateOptions.error) {
            return next(validateOptions.error);
        }

        const sigtermStop = () => {

            // $lab:coverage:off$
            server.root.stop({
                timeout: options.sigtermTimeout * 1000
            }, () => {

                process.exit();
            });
            // $lab:coverage:on$
        };


        const sigintStop = () => {

            // $lab:coverage:off$
            server.root.stop({
                timeout: options.sigintTimeout * 1000
            }, () => {

                process.exit();
            });
            // $lab:coverage:on$
        };

        process.on('SIGTERM', sigtermStop);
        process.on('SIGINT', sigintStop);

        next();
    }
};

hapiGracefulShutdownPlugin.register.attributes = {
    pkg: require('../package.json')
};

module.exports = hapiGracefulShutdownPlugin;
