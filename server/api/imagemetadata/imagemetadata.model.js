'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ImagesMetadataSchema = new Schema({
    data: {},
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now },
    isDeleted: { type: Boolean, 'default': false },
    isActive: { type: Boolean, 'default': true },
}, { versionKey: false, strict: false, timestamps: true });


module.exports = mongoose.model('ImagesMetadata', ImagesMetadataSchema);