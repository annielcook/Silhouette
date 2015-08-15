'use strict'

app.controller('LoginCtrl', function ($scope, $state, $rootScope) {
	$scope.loginUser = function (userInfo) {
		$state.go('home')
		// Auth.login(userInfo)
		// .then(function (loggedInUser) {
		// 	console.log('Successful login!')
		// })
		// .catch (function (e) {
		// 	console.log('error logging in', e)
		// })
  };
	$scope.goToSignup = function(){
		$state.go('signup')
	}
})