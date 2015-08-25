'use strict'
var Promise = require('bluebird');
var _ = require('lodash');


window.thisApp.directive('sidebar', function ($rootScope, $state, InstallationFactory) {
	return {
		restrict: 'E',
		templateUrl: __dirname + '/sidebar.html',
		link: function ($scope, element, attrs) {
			//call install all for files, packages, and apps
			$scope.setUpEnv = function(){
				// InstallationFactory.installAllFiles
				// .then(function(){
				// 	return InstallationFactory.installAllPackages;
				// })
				// .then(function(){})
					
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