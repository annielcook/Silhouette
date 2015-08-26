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
				alert('Congratulations! \nYour environment is all set.\n\n\nHappy coding!')
				// InstallationFactory.installAllFiles()
				// .then(function () {
				// 	console.log('installed all files!')
				// 	return InstallationFactory.preInstallCheck()
				// })
				// .then(function (needToInstall) {
				// 	console.log('Need to install: ', needToInstall)
				// 	if(!needToInstall.length) {
				// 		('nothing needs to install')
				// 		return InstallationFactory.installAllPackages();
				// 	} else {
				// 		('something needs to install')
				// 		$state.go('loggedIn.installationCheck', {needToInstall : needToInstall, fromState: "setUpEnv"});
				// 	}
				// })
				// .then(function () {
				// 	return InstallationFactory.installAllApps();
				// })
				// .then(function() {
				// 	console.log('victory!')
				// })
				// .then(null, function (err) {
				// 	console.error('Error: ', err);
				// })

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