var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

window.thisApp.controller('ApplicationSelectorCtrl', function ($scope, ApplicationSelectorFactory, $rootScope, $state) {
	$scope.appOptions = [
		'alfred',
		'caffeine',
		'cheatsheet',
		'chrome-devtools',
		'chromecast',
		'dropbox',
		'firefox',
		'flux',
		'gimp',
		'google-chrome',
		'iterm2',
		'kindle',
		'macvim',
		'rdio',
		'robomongo', 
		'skype',
		'slack',
		'spotify',
		'sublime-text',
		'virtualbox',
		'vlc'
	];
	$scope.appPrefs = [];

	$scope.addAppPreference = function(appName){
		$scope.appPrefs = ApplicationSelectorFactory.addAppPrefs(appName, $scope.appPrefs);
		console.log("app prefs: ", $scope.appPrefs)
	}

	$scope.addAllAppsToUser = function(){
		ApplicationSelectorFactory.addAppsToUser($scope.appPrefs)
		.then(function(apps){
			console.log("apps from factory: ", apps)
			$scope.$digest();
			$state.go('loggedIn.home');
		});
	}
})