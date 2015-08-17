'use strict'
var mongoose = require('mongoose');
var envkeys = require('./EnvKeys');

var FileSchema = new mongoose.Schema({
    name: String,
    content: String,
    path: String
});


module.exports = mongoose.model('File', FileSchema)