'use strict';
var async_module = require('async');
var multer = require('multer');
const uuidv4 = require('uuid/v4');
const mime = require('mime-types')

//Services
var ImageMetaDataService = require('../imagemetadata/imagemetadata.service');

exports.create = function (req, res, next) {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }

    let metadDataPayload = {
        data: file
    };

    ImageMetaDataService.save(metadDataPayload, function (error,data) {
        if (error) {
            return res.boom.badRequest(error.message);
        }
        return res.status(200).json({
            "statusCode": 200,
            "error": "",
            "message": "Successfully created !!!",
            "data": data
        });
    });
};


// SET STORAGE
exports.storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadbucket/')
    },
    filename: function (req, file, cb) {
        let mimeType = mime.extension(file.mimetype)
        cb(null, uuidv4() + '.' + mimeType)
    }
})