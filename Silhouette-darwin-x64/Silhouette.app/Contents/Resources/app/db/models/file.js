'use strict'
var mongoose = require('mongoose');

var FileSchema = new mongoose.Schema({
    name: String,
    content: String,
    path: String,
    date: {type: Date, default: Date.now}
});


module.exports = mongoose.model('File', FileSchema)