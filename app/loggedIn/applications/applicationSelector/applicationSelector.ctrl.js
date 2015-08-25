var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var _ = require('lodash');

window.thisApp.controller('ApplicationSelectorCtrl', function ($scope, ApplicationFactory, $rootScope, $state) {
	$scope.checked = true;

	$scope.displayAppList = function(){
		var appsAvailableInCask = ApplicationFactory.uploadFinderInstalled();
		$scope.appPrefs = []

		var appsInCurrentCask = ApplicationFactory.uploadCaskInstalled()

		$scope.appPrefs = _.uniq(appsAvailableInCask.concat(appsInCurrentCask)) || appsAvailableInCask.concat([])
		$scope.appPreferencs = _.uniq(appsAvailableInCask.concat(appsInCurrentCask)) || appsAvailableInCask.concat([])

	}

	$scope.displayAppList()

	$scope.addAppPreference = function(appName){
		console.log("app prefs before sending to factory: ", $scope.appPrefs)
				// $scope.appPrefs = ApplicationFactory.addAppPrefs(appName, $scope.appPrefs);
		$scope.appPreferences = ApplicationFactory.addAppPrefs(appName, $scope.appPreferencs);
		console.log("app preferences: ", $scope.appPreferences)
	}

	$scope.addAllAppsToUser = function(){
		console.log('$scope.addPreferences', $scope.appPreferences);
		ApplicationFactory.addAppsToUser($scope.appPreferences)
		.then(function(apps){
			console.log("apps from factory: ", apps)
			$scope.$digest();
			$state.go('loggedIn.home');
		});
	}
})