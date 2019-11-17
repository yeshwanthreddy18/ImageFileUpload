'use strict';
var async_module = require('async');

//Services
var ImageMetaDataService = require('./imagemetadata.service');

exports.get = function (req, res, next) {

    function fetchMetadata(callback) {
        var pageNumber = (req.query.PageNumber) ? parseInt(req.query.PageNumber) : 0;
        var pageSize = (req.query.PageSize) ? parseInt(req.query.PageSize) : 0;
        var selectProp = "",
            refId = '',
            query = { isDeleted: false },
            skip = (pageNumber - 1) * pageSize,
            sortProp = '-createdAt',
            limit = pageSize

        ImageMetaDataService.findRef(query, refId, selectProp, sortProp, skip, limit, function (err, data) {
            if (err)
                return callback(err, null)
            if (!data)
                return callback(null, []);
            return callback(null, data);
        })
    }

    async_module.waterfall([
        fetchMetadata,
    ], function (err, results) {
        if (err)
            return res.boom.badImplementation('An internal server error occurred');
        res.status(200).json({
            "statusCode": 200,
            "error": "",
            "message": "",
            "data": results
        });
    });

};


