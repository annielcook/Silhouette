'use strict'
var mongoose = require('mongoose');

var AppSchema = new mongoose.Schema({
    name: String,
    tracking: {type: Boolean, default: true},
    date: {type: Date, default: Date.now}
});


module.exports = mongoose.model('App', AppSchema)