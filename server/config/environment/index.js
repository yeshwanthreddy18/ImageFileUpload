'use strict';

var path = require('path'),
    _ = require('lodash');

var all = {

    env: process.env.ENV || 'development',
    root: path.normalize(__dirname + '/../../..'),
    port: process.env.PORT || 3123,

    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    },
    secrets: {
        session: process.env.SESSION_SECRET || 'secretKey'
    },
    uploadDirectoryPath: path.resolve(path.join(process.cwd(), 'tempdir', '/'))
};
module.exports = _.merge(all, require('./' + all.env + '.js'));