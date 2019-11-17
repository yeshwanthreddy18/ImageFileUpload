'use strict';

var express = require('express'),
    router = express.Router();

// Controller as Service
const controller = require('./imagemetadata.controller');

router.get('/', controller.get);

module.exports = router;