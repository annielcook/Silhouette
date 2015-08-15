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