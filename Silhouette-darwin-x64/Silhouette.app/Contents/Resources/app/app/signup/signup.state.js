'use strict'
console.log('signup state')
window.thisApp.config(function ($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: __dirname +'/signup.html',
		controller: 'SignupCtrl'
	})
})