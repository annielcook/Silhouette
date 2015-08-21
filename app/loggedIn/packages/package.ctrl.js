var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

window.thisApp.controller('PackageCtrl', function ($scope, $state, $rootScope, AccountEditFactory, PackageFactory) {
	$scope.packageOptions = ['npm', 'brew'];
	$scope.packagePrefs = [];

	//handles the toggle on the package selector state
	$scope.addPackagePreference = function(packagename){
	  $scope.packagePrefs = PackageFactory.addPackagePrefs(packagename, $scope.packagePrefs);
	}


	//add packages to user
	//build paths to these packages
	//create new package objects
	//read directories into object
	$scope.main = function () {
		addPackagePreferenceToUser()
	}



	var addPackagePreferenceToUser = function () {
		$rootScope.currentUser.packagePreferences = $scope.packagePrefs;
		console.log('root scope prefs: ',$rootScope.currentUser)
    AccountEditFactory.saveUserChanges();
    console.log('after package has been saved: ', $rootScope.currentUser.packagePreferences)
    //child process that reads files from user 
    //getInstalledPackageNames();
    //go to file manager state
    //$state.go('loggedIn.fileManager');
	}


	var makePackagePaths = function () {
		var packagePaths = [];
		//tells the readdir where to look
		console.log('!!!',$rootScope.currentUser.packagePreferences)
		for(var pack in $rootScope.currentUser.packagePreferences) {
			var path;
			if(pack === 'brew') {
				path = '/usr/local/Cellar';
			} else if (pack === 'npm') {
				path = '/usr/local/lib/node_modules';
			} 
			packagePaths[ind] = path;
		}
		console.log('made package paths: ', packagePaths)
		return packagePaths;
	}

	var getInstalledPackageNames = function () {
		//go through package prefs (npm and/or brew)
		//for each package pref, create a string
		//fs readdir (async) 
		//on user add packages object, key will be name of package, value will 
		//be space separated string of module names
		var paths = makePackagePaths();

		//
		Promise.map(paths, function (path) {
			return Promise.all(fs.readdir(path, function (err, arrOfFiles) {
		 		return arrOfFiles;
		 	}))
		})
		.then(function (names) {
			console.log('here are the names: ', names)
		})


		// console.log('number of times: ', $scope.packagePrefs.length)
		// $scope.packagePrefs.forEach(function (pack) {
		// 	console.log('inside for each')
		// 	var path;
		// 	if(pack === 'brew') {
		// 		path = '/usr/local/Cellar';
		// 	} else if (pack === 'npm') {
		// 		path = '/usr/local/lib/node_modules';
		// 	} 
		// 	fs.readdir(path, function (err, arrOfFiles) {
		// 		console.log('Files: ',arrOfFiles)
		// 	})
		// })
	}

})