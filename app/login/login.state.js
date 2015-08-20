'use strict'

window.thisApp.config(function ($stateProvider) {
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: __dirname +'/login.html',
		controller: 'LoginCtrl'
	})
})