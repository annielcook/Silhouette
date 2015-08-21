var fs = require('fs')

window.thisApp.controller('PackageCtrl', function ($scope) {
	$scope.packageOptions = ['npm', 'brew'];
	$scope.packagePrefs = [];

	$scope.addSelectedPackages = function (packagename) {
		var packageIndex = $scope.packagePrefs.indexOf(packagename);
		if(packageIndex === -1){
			$scope.packagePrefs.push(packagename);
		} else {
			$scope.packagePrefs.splice(packageIndex, 1);
		}
		return packagePrefs;
	}
	// $scope.addPackagePreferenceToUser = function () {
	// 	$rootScope.currentUser.packagePreferences = $scope.packagePrefs;
 //    AccountEditFactory.saveUserChanges();
 //    //child process that reads files from user 
 //    getInstalledPackageNames();
 //    //go to file manager state
 //    $state.go('loggedIn.fileManager');
	// }

	var getInstalledPackageNames = function () {
		//go through package prefs (npm and/or brew)
		//for each package pref, create a string
		//fs readdir (async) 
		//on user add packages object, key will be name of package, value will 
		//be space separated string of module names
		$scope.packagePrefs.forEach(function (pack) {
			var path;
			if(pack === 'brew') {
				path = '/usr/local/Cellar';
			} else if (pack === 'npm') {
				path = '/usr/local/lib/node_modules';
			} 
			fs.readdir(path, function (err, arrOfFiles) {
				console.log('Files: ',arrOfFiles)
		})
	}

})