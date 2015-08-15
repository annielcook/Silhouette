'use strict'

app.config(function ($stateProvider) {
	$stateProvider.state('home', {
		url: '/home',
		templateUrl: 'file://'+__dirname+'/app/home/home.html',
		controller: 'HomeCtrl'
	})
})