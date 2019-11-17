'use strict';
var path = require('path');

module.exports = {
    env: process.env.ENV,
    root: path.normalize(__dirname + '/../../..'),
    port: 3123,
    ip: process.env.IP || undefined,
    mongo: {
        uri: 'mongodb://localhost/demo_database',
        options: {
            poolSize: 5,
            useNewUrlParser: true
        }
    }
};