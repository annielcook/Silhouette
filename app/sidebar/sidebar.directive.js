'use strict'

window.thisApp.directive('sidebar', function ($rootScope, $state, PackageFactory, FileManagerFactory, ApplicationFactory) {
	return {
		restrict: 'E',
		templateUrl: __dirname + '/sidebar.html',
		link: function ($scope, element, attrs) {
			$scope.logout = function () {
				$rootScope.currentUser = null;
				$state.go('login')
			}
			//call install all for files, packages, and apps
			$scope.setUpEnv = function(){

			}
		}
	}
})

window.thisApp.directive('isActive', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.bind('click', function () {
				element.parent().children().removeClass('active');
				element.toggleClass('active');
			})
		}
	}
})