'use strict'


var app = angular.module('silhouette', ['ui.router']);


app.config(function ($urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
	$urlRouterProvider.otherwise('/');
});

//require('./login/index.js')(app)
window.thisApp = app;
console.log("GLOBAL APP: ", window.thisApp)

window.thisApp.run(['$state', '$rootScope', function ($state, $rootScope) {
	console.log('here')
	$state.go('login')
}])

console.log('dirname: ', __dirname)

require(__dirname + '/db')
require(__dirname + '/app/login')
require(__dirname + '/app/loggedIn')
require(__dirname + '/app/sidebar')
require(__dirname + '/app/signup')