'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var boom = require('express-boom');

var config = require('./environment');

module.exports = function (app) {

    var env = config.env;

    app.set('view engine', 'html');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    // app.use(bodyParser.json({ limit: '50mb' }));
    // app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(express.static(path.join(config.root, 'dist/')));
    app.use('/uploadbucket',express.static(path.join(config.root, 'uploadbucket/')));
    // app.set('appPath', 'dist/Upload');
    app.set('appPath', 'src');
    app.set('view engine', 'html');

    if (env === 'development' || env === 'test') {
        app.use(require('errorhandler')());
    }
    app.use(boom());
};
