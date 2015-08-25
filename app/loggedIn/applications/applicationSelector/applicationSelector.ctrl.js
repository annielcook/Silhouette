var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var _ = require('lodash');

window.thisApp.controller('ApplicationSelectorCtrl', function ($scope, ApplicationFactory, $rootScope, $state) {
	$scope.checked = true;

	$scope.displayAppList = function(){
		return ApplicationFactory.uploadFinderInstalled()
		.then(function(apps){
			var appsAvailableInCask = apps

			var appsInCurrentCask = ApplicationFactory.uploadCaskInstalled()

			// app prefs is what is displayed
			$scope.appPrefs = _.uniq(appsAvailableInCask.concat(appsInCurrentCask)) || appsAvailableInCask
			// app preferences is what is selected
			$scope.appPreferences = _.clone($scope.appPrefs)

			console.log("$scope.appPrefs: ", $scope.appPrefs)
			console.log("$scope.appPreferences: ", $scope.appPreferences)
			$scope.$digest()
		});		
	}

	$scope.displayAppList()

	$scope.addAppPreference = function(appName){
		console.log("app prefs before sending to factory: ", $scope.appPrefs)
		console.log("app preferences before sending to factory: ", $scope.appPreferences)
		console.log("app name before sending to factory: ", appName)
		// $scope.appPrefs = ApplicationFactory.addAppPrefs(appName, $scope.appPrefs);
		$scope.appPreferences = ApplicationFactory.addAppPrefs(appName, $scope.appPreferences);
		console.log("app preferences after reassignment: ", $scope.appPreferences)
		console.log("app prefs after reassignment: ", $scope.appPrefs)
	}

	$scope.addAllAppsToUser = function(){
		ApplicationFactory.addAppsToUser($scope.appPreferences)
		.then(function(apps){
			// console.log("apps from factory: ", apps)
			// $scope.$digest();
			$state.go('loggedIn.home');
		});
	}
})