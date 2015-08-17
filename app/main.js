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

app.controller('HomeCtrl', function ($scope, $state, HomeFactory) {
  
  $scope.hello = "Hello Anna";

  $scope.uploadFile = HomeFactory.uploadFile;

})

app.factory('HomeFactory', function($http){
  return{
    uploadFile :function(event){
      var file = event.target.files;
      console.log('files', file);
    }
  }
})

app.config(function ($stateProvider) {
	$stateProvider.state('home', {
		url: '/home',
		templateUrl: 'file://'+__dirname+'/app/home/home.html',
		controller: 'HomeCtrl'
	})
})
'use strict'
var Crypto = require('crypto')

//@@ do we need sessions -- we think no because its not a browser app

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
			return users.findOne({email: credentials.email})
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
			return users.findOne({email: userInfo.email})
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
			$state.go('home')
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