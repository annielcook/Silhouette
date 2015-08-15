'use strict'

var databaseURI = 'mongodb://silhouette:silhouette1506@ds031893.mongolab.com:31893/silhouette';


var mongoose = require('mongoose')
var db = mongoose.connect(databaseURI).connection;

var users = db.collection('users')

app.factory('Auth', function ($http) {
	return {
		login: function (credentials) {
			return users.findOne({email: credentials.email})
			.then(function (res) {
				console.log('!!!!!!!', res)
				res.data;
			})
		}
	}
})