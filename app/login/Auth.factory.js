'use strict'
var Crypto = require('crypto')

require(__dirname + '/db/models/user');


//@@ do we need sessions -- we think no because its not a browser app

//@@ should we be making a new db connection here of exporting?
var databaseURI = 'mongodb://silhouette:silhouette1506@ds031893.mongolab.com:31893/silhouette';
var mongoose = require('mongoose');
var db = mongoose.connect(databaseURI).connection;
var User = mongoose.model('User');

//@@ these are duplicates from models/user.js -- how can i share between these files
var encryptPassword = function(plainText, salt) {
	var hash = Crypto.createHash('sha1');
	hash.update(plainText);
	hash.update(salt);
	return hash.digest('hex');
};

var passwordMatches = function (testpass, userpass, salt) {
	return (encryptPassword(testpass, salt) === userpass) 
}


app.factory('Auth', function ( $rootScope) {
	return {
		login: function (credentials) {
			return User.findOne({email: credentials.email})
			.then(function (user) {
				if(user && passwordMatches(credentials.password, user.password, user.salt)) {
	        //@@ should we establish session here?
	        $rootScope.currentUser = user.email;
	        return user;
				} else {
					var err = new Error('Not Authenticated')
					err.status = 401;
					throw err;
				}
			})
		},
		signup: function(userInfo){
			return User.findOne({email: userInfo.email})
			.then(function (findings) {
				if(findings === null) {
					var newUser = new User(userInfo);
					return newUser.save(function (err) {
						if (err) return err;
						return newUser.save();
					})
				} else {
					var err = new Error('User with that email already exists!')
					err.status = 401;
					throw err;
				}

			})
		}
	}
})