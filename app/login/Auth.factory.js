'use strict'
var Crypto = require('crypto')


//@@ should we be making a new db connection here of exporting?
var databaseURI = 'mongodb://silhouette:silhouette1506@ds031893.mongolab.com:31893/silhouette';
var mongoose = require('mongoose')
var db = mongoose.connect(databaseURI).connection;

var users = db.collection('users')


//@@ these are duplicates from models/user.js -- how can i share between these files
var encryptPassword = function(plainText, salt) {
	var hash = Crypto.createHash('sha1');
	hash.update(plainText);
	hash.update(salt);
	return hash.digest('hex');
};

var passwordMatches = function (testpass, userpass, salt) {
	console.log("encrypted: "+ encryptPassword(testpass, salt) + ' userpass: '+ userpass)
	return (encryptPassword(testpass, salt) === userpass) 
}

app.factory('Auth', function ($http, $rootScope) {
	return {
		login: function (credentials) {
			return users.findOne({email: credentials.email})
			.then(function (user) {
				if(user && passwordMatches(credentials.password, user.password, user.salt)) {
	        //@@ should we establish session here?
	        $rootScope.currentUser = user;
	        return user;
				} else {
					var err = new Error('Not Authenticated')
					err.status = 401;
					throw err;
				}
			})
		}
	}
})