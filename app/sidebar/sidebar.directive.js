'use strict'

window.thisApp.directive('sidebar', function ($rootScope, $state) {
	return {
		restrict: 'E',
		templateUrl: __dirname + '/sidebar.html',
		link: function ($scope, element, attrs) {
			$scope.logout = function () {
				$rootScope.currentUser = null;
				$state.go('login')
			}
		}
	}
})