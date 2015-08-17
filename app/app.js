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