var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var _ = require('lodash');

window.thisApp.controller('ApplicationSelectorCtrl', function ($scope, ApplicationFactory, $rootScope, $state) {
	$scope.checked = true;

	$scope.displayAppList = function(){
		var appsAvailableInCask = ApplicationFactory.uploadFinderInstalled();
		$scope.appPrefs = []
		// $scope.appPreferences = []

		var appsInCurrentCask = ApplicationFactory.uploadCaskInstalled()

		// app prefs is what is displayed
		// app preferences is what is selected
		$scope.appPrefs = _.uniq(appsAvailableInCask.concat(appsInCurrentCask)) || appsAvailableInCask
		$scope.appPreferences = _.clone($scope.appPrefs)
		// $scope.appPreferencs = _.uniq(appsAvailableInCask.concat(appsInCurrentCask)) || appsAvailableInCask.concat([])

		console.log("$scope.appPrefs: ", $scope.appPrefs)
		console.log("$scope.appPreferences: ", $scope.appPreferences)
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
		// if ($scope.appPreferences != undefined){
			ApplicationFactory.addAppsToUser($scope.appPreferences)
			.then(function(apps){
				console.log("apps from factory: ", apps)
				$scope.$digest();
				$state.go('loggedIn.home');
			});
		// } 
		// else {
		// 	ApplicationFactory.addAppsToUser($scope.appPrefs)
		// 	.then(function(apps){
		// 		console.log("apps from factory: ", apps)
		// 		$scope.$digest();
		// 		$state.go('loggedIn.home');
		// 	});
		// }
	}
})