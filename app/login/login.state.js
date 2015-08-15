'use strict'

app.config(function ($stateProvider) {
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'file://'+__dirname+'/app/login/login.html',
		controller: 'LoginCtrl'
	})
})