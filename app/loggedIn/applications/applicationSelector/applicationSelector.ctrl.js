var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

window.thisApp.controller('ApplicationSelectorCtrl', function ($scope, ApplicationFactory, $rootScope, $state) {
	$scope.finderApps = ApplicationFactory.uploadFinderInstalled();
	$scope.appsAvailableInCask = ApplicationFactory.availableApps($scope.finderApps);
	$scope.appsInCurrentCask = fs.readdirSync("/opt/homebrew-cask/Caskroom");

	// $scope.appOptions = function(){
	// 	console.log("from factory: ", ApplicationFactory.optionals($scope.appsAvailableInCask))
	// 	return ApplicationFactory.optionals($scope.appsAvailableInCask)
	// }

	$scope.appPrefs = [];

	$scope.addAppPreference = function(appName){
		$scope.appPrefs = ApplicationFactory.addAppPrefs(appName, $scope.appPrefs);
		console.log("app prefs: ", $scope.appPrefs)
	}

	$scope.addAllAppsToUser = function(){
		ApplicationFactory.addAppsToUser($scope.appPrefs)
		.then(function(apps){
			console.log("apps from factory: ", apps)
			$scope.$digest();
			$state.go('loggedIn.home');
		});
	}
})