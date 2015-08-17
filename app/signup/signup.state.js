'use strict'

app.config(function ($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: 'file://'+__dirname+'/app/signup/signup.html',
		controller: 'SignupCtrl'
	})
})