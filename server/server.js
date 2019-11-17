'use strict';
var express = require('express');
var async = require('async');
var config = require('./config/environment');
var mongoose = require('mongoose');
var app = express();
var server = require('http').createServer(app);

var runExpressRoutes = function () {
    require('./config/express')(app);
    require('./routes')(app);
}

async.series({
    mongodb: function (callback) {
        mongoose.connect(config.mongo.uri, config.mongo.options, function (error) {
            if (error) {
                console.log(error);
                console.log('Mongodb server is down!');
                return callback(error, null)
            } else {
                console.log('All is well mongodb');
                return callback(null, true)
            }
        });
    }
}, function (err, results) {
    if (err) console.log('Error in running server', new Error(err));
    runExpressRoutes();
});

server.listen(config.port, config.ip, function () {
    var message = (config.env === 'localhost') ? 'Development' : 'Production';
    if (!config.env) message = "Local";
    console.log(' Running In ' + message + ' : %d', config.port);
    console.log('My ENV :', config.env)
});

module.exports = server;