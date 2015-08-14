'use strict'
var Promise = require('bluebird')
var path = require('path')
var Grid = require('gridfs-stream')
var databaseURI = 'mongodb://localhost:27017/silhouette';

//@@ how to connect????
var mongoose = require('mongoose')
var db = mongoose.connect(databaseURI).connection;
var gfs = new Grid(db, 'fs');

require('./models')

var startDbPromise = new Promise(function (res, rej) {
	db.on('open', res);
	db.on('error', rej);
})

startDbPromise.then(function () {
	console.log('MongoDb connection opened. Yay!');
})

module.exports = startDbPromise;


