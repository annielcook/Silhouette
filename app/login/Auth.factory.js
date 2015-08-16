'use strict'
var Crypto = require('crypto')


//@@ should we be making a new db connection here of exporting?
 var databaseURI = 'mongodb://silhouette:silhouette1506@ds031893.mongolab.com:31893/silhouette';
var mongoose = require('mongoose')
var db = mongoose.connect(databaseURI).connection;

var users = db.collection('users')

var User = require(__dirname + '/db/models/user')

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
			console.log('here')
			return users.findOne({email: credentials.email})
			.then(function (user) {
				console.log('user: ', user)
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
		},
		signup: function(userInfo){
			var newUser = new User(userInfo);
			return newUser.save(function (err) {
				if (err) return err;
				return newUser.save();
			})
			// return users.insert(userInfo, function (err, result) {
			// 	console.log('result: ', result)
			// 	return result;
			// })
		}
			// .then(function (user) {
			// 	$rootScope.currentUser = user;
		 //    console.log("user: ", user)
		 //    return user;
			// })
	}
})