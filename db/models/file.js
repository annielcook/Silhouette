'use strict'
var mongoose = require('mongoose');

var FileSchema = new mongoose.Schema({
    name: String,
    content: String,
    path: String,
    date: String
});


module.exports = mongoose.model('File', FileSchema)