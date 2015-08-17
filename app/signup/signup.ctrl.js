'use strict'

app.controller('SignupCtrl', function (Auth, $scope, $state, $rootScope) {
	$scope.signupUser = function (userInfo) {
		Auth.signup(userInfo)
		.then(function () {
			return Auth.login(userInfo);
		})
		.then(function (loggedInUser) {
			$rootScope.currentUser = userInfo.email;
			console.log('Successful login!')
			$state.go('home')
		})
		.catch (function (e) {
			console.log('error logging in', e)
		})
	}
})