'use strict';

var express = require('express'),
    router = express.Router();

var multer = require('multer');

// Controller as Service
const controller = require('./upload.controller');

var upload = multer({ storage: controller.storage });


router.post('/', upload.single("files"), controller.create);

module.exports = router;