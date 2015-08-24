var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

window.thisApp.controller('ApplicationSelectorCtrl', function ($scope, ApplicationFactory, $rootScope, $state) {
	$scope.checked = true;

	$scope.displayAppList = function(){
		$scope.finderApps = ApplicationFactory.uploadFinderInstalled();
		$scope.appsAvailableInCask = ApplicationFactory.availableApps($scope.finderApps);
		$scope.appPrefs = []

		// check if brew cask storage directory exists before reading it
		var stat = fs.statSync("/opt/homebrew-cask/Caskroom");
		if ( stat.isDirectory() ) {
			$scope.appsInCurrentCask = fs.readdirSync("/opt/homebrew-cask/Caskroom");
			$scope.appsInCurrentCask.forEach(function(app){
				$scope.appPrefs.push(app)
			})
		}

		$scope.appsAvailableInCask.forEach(function(app){
			$scope.appPrefs.push(app)
		})
	}
	$scope.displayAppList()

	// // display options that have not been chosen
	// $scope.appOptions = function(){
	// 	console.log("from factory: ", ApplicationFactory.optionals($scope.appsAvailableInCask))
	// 	return ApplicationFactory.optionals($scope.appsAvailableInCask)
	// }


	$scope.addAppPreference = function(appName){
		console.log("app prefs before sending to factory: ", $scope.appPrefs)
				// $scope.appPrefs = ApplicationFactory.addAppPrefs(appName, $scope.appPrefs);
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