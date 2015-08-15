'use strict'

app.controller('LoginCtrl', function ($scope, $state, Auth) {
	$scope.login = function (loginInfo) {



    };
	$scope.goToSignup = function(){
		$state.go('signup')
	}
})