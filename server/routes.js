'use strict';
var config = require('./config/environment');
// var ev = require('express-validation');
var cors = require('cors');

module.exports = function (app) {
    app.use(function (req, res, next) {
        next();
    })
    app.use(cors())
    // API
    app.use('/api/upload', require('./api/upload'));
    app.use('/api/metadata', require('./api/imagemetadata'));

    app.route('/:url(api|app|assets|img|js|styles|includes)/*')
        .get(function (req, res) {
            res.status(404).end();
        });
    app.route('/')
        .get(function (req, res) {
            res.sendFile(app.get('appPath') + '/index.html', {
                root: config.root
            });
        });


    app.route('/*')
        .get(function (req, res) {
            res.sendFile(app.get('appPath') + '/index.html', {
                root: config.root
            });
        });

    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        if (err) {
            var errorObject = {
                "statusCode": err.status,
                "error": err.statusText,
                "message": ""
            };
            errorObject.message = (err.errors && err.errors.length > 0) ? err.errors[0].messages[0] : "Something went wrong";
            errorObject.message = errorObject.message.replace(/\"/g, "").replace(/\\/g, "");
            return res.status(errorObject.statusCode).json(errorObject);
        } else {
            res.status(err.status || 200).send({
                "message": err.message,
                "statusCode": err.code || 4,
                "error": err.type || "danger"
            });
        }
    });
};