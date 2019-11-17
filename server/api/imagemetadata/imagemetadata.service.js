'use strict';

var underscore = require('underscore');
var ImageMetaData = require('./imagemetadata.model');

module.exports = {

    findOne: function (query, selectProp, callback) {
        ImageMetaData.findOne(query, selectProp, function (err, doc) {
            callback(err, doc)
        });
    },
    find: function (query, selectProp, sortProp, skipNum, limitNum, callback) {
        var sort = underscore.isEmpty(sortProp) ? { 'createdAt': -1 } : sortProp;
        var qobj = ImageMetaData.find(query, selectProp);
        qobj.sort(sort).skip(skipNum).limit(limitNum).exec(function (err, doc) {
            callback(err, doc)
        });
    },
    save: function (obj, callback) {
        var qobj = new ImageMetaData(obj);
        qobj.save(function (err, doc) {
            callback(err, doc)
        });
    },
    update: function (query, update, options, callback) {
        ImageMetaData.update(query, update, options, function (err, doc) {
            callback(err, doc);
        });
    },
    findOneAndUpdate: function (query, update, options, callback) {
        Package.findOneAndUpdate(query, update, options, function (err, doc) {
            callback(err, doc);
        });
    },
    count: function (query, callback) {
        ImageMetaData.countDocuments(query, function (err, count) {
            callback(err, count);
        });
    },
    findRef: function (query, refId, selectProp, sortProp, skipNum, limitNum, callback) {
        var sort = underscore.isEmpty(sortProp) ? { 'createdAt': -1 } : sortProp;
        var qobj = ImageMetaData.find(query, selectProp);
        qobj.sort(sort).skip(skipNum).limit(limitNum).populate(refId).exec(function (err, doc) {
            callback(err, doc)
        });
    },
    findRefWithSelect: function (query, refId, selectFields, selectProp, sortProp, skipNum, limitNum, callback) {
        var sort = underscore.isEmpty(sortProp) ? { 'createdAt': -1 } : sortProp;
        var qobj = ImageMetaData.find(query, selectProp);
        qobj.sort(sort).skip(skipNum).limit(limitNum).populate(refId, selectFields).exec(function (err, doc) {
            callback(err, doc)
        });
    },
    aggregate: function (pipeline, options, callback) {
        var qobj = ImageMetaData.aggregate(pipeline, options);
        qobj.exec(function (err, doc) {
            callback(err, doc)
        });
    },
}
