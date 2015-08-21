'use strict'
var mongoose = require('mongoose');

var PackageSchema = new mongoose.Schema({
    name: String,
    path: String,
    modules: [String],
    date: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Package', PackageSchema)