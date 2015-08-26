'use strict'

window.thisApp.controller('LoginCtrl', function (Auth, $scope, $state, $rootScope) {
	$scope.loginUser = function (userInfo) {
		Auth.login(userInfo)
		.then(function (loggedInUser) {
			console.log('Successful login!')
			$state.go('loggedIn.home')
		})
		.catch (function (e) {
			console.log('error logging in', e)
		})
  };
})