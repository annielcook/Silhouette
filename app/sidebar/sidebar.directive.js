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

window.thisApp.directive('isActive', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.bind('click', function () {
				console.log('angular.element(this): ', angular.element(this))
				console.log('this: ', this)
				element.parent().children().removeClass('active');
				element.toggleClass('active');
			})
		}
	}
})