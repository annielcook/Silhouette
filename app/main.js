'use strict'


var app = angular.module('silhouette', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
	$urlRouterProvider.otherwise('/');
});

app.run(['$state', '$rootScope', function ($state, $rootScope) {
	$state.go('login')
}])
app.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeHandler);
    }
  };
});
var mongoose = require('mongoose');
// var databaseURI = 'mongodb://silhouette:silhouette1506@ds031893.mongolab.com:31893/silhouette';
// var db = mongoose.connect(databaseURI).connection;
require(__dirname + '/db/models/file');
require(__dirname + '/db/models/user');
var fs = require('fs');
var File = mongoose.model('File');
var User = mongoose.model('User');

app.controller('LoggedInCtrl', function ($scope, $state, LoggedInFactory) {
  
  $scope.hello = "Hello Anna";

  $scope.uploadFile = LoggedInFactory.uploadFile;

})


app.factory('LoggedInFactory', function(){
  return{
    uploadFile :function(event){
      var file = event.target.files[0];
      console.log('files', file);
      var data = fs.readFileSync(file.path, 'utf8');
      File.create({'name': file.name, 'content': data, 'path': file.path})
      .then(function(createdFile){
        // console.log('file', file);
        console.log('createdFile:', createdFile);
        return User.findOneAndUpdate({email: $rootScope.currentUser}, {$push: {files: createdFile} }, {new : true})
      })
      .then(null, next);
    }
  }
})

app.config(function ($stateProvider) {
	$stateProvider.state('loggedIn', {
		url: '/loggedIn',
		templateUrl: 'file://'+__dirname+'/app/loggedIn/loggedIn.html',
		controller: 'LoggedInCtrl',
		resolve: {
			currentUser: function ($rootScope) {
				return $rootScope.currentUser;
			}
		}
	})
	.state('loggedIn.account', {
		url: '/account',
		templateUrl: __dirname + '/app/loggedIn/account.html'
	})
	.state('loggedIn.fileManager', {
		url: '/file-manager',
		templateUrl: __dirname + '/app/loggedIn/fileManager.html'
	})
	.state('loggedIn.social', {
		url: '/social',
		templateUrl: __dirname + '/app/loggedIn/social.html'
	})
})
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
'use strict'

app.controller('LoginCtrl', function (Auth, $scope, $state, $rootScope) {
	$scope.loginUser = function (userInfo) {
		Auth.login(userInfo)
		.then(function (loggedInUser) {
			$rootScope.currentUser = userInfo.email;
			console.log('Successful login!')
			$state.go('loggedIn.fileManager')
		})
		.catch (function (e) {
			console.log('error logging in', e)
		})
  };
})
'use strict'

app.config(function ($stateProvider) {
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'file://'+__dirname+'/app/login/login.html',
		controller: 'LoginCtrl'
	})
})
'use strict'

app.directive('sidebar', function ($rootScope, $state) {
	return {
		restrict: 'E',
		templateUrl: __dirname + '/app/sidebar/sidebar.html',
		link: function ($scope, element, attrs) {
			$scope.logout = function () {
				$rootScope.currentUser = null;
				$state.go('login')
			}
		}
	}
})
'use strict'

app.controller('SignupCtrl', function (Auth, $scope, $state, $rootScope) {
	$scope.signupUser = function (userInfo) {
		Auth.signup(userInfo)
		.then(function () {
			return Auth.login(userInfo);
		})
		.then(function (loggedInUser) {
			$rootScope.currentUser = userInfo.email;
			console.log('Successful login!')
			$state.go('home')
		})
		.catch (function (e) {
			console.log('error logging in', e)
		})
	}
})

'use strict'

app.config(function ($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: 'file://'+__dirname+'/app/signup/signup.html',
		controller: 'SignupCtrl'
	})
})