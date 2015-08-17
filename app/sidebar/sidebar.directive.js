'use strict'

app.directive('sidebar', function ($rootScope, $state) {
	return {
		restrict: 'E',
		templateUrl: __dirname + '/app/sidebar/sidebar.html',
		link: function ($scope, element, attrs) {
			$scope.logout = function () {
				$rootScope.currentUser = null;
				$state.go('login')
			}
		}
	}
})