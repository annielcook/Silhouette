var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

window.thisApp.controller('PackageSelectorCtrl', function ($scope, $state, $rootScope, AccountEditFactory, PackageFactory) {
	$scope.packageOptions = ['npm', 'brew'];
	$scope.packagePrefs = ['npm', 'brew'];

  $scope.checked = true;
	//handles the toggle on the package selector state
	$scope.addPackagePreference = function(packagename){
		$scope.packagePrefs = PackageFactory.addPackagePrefs(packagename, $scope.packagePrefs);
	}

	//go through preferences on scope
	//get file paths
	//call fs.readdir to get modules for each pref
	//create preference object for each (name, path, modules)
	//update user in database
	//go to app selector state


	$scope.getModulePaths = function (name) {
		var path;
		if(name === 'brew') {
			path = '/usr/local/Cellar';
		} else if (name === 'npm') {
			path = '/usr/local/lib/node_modules';
		}
		return path;
	}

	$scope.getAllModules = function () {
		// $scope.packageInfo = [];
		Promise.map($scope.packagePrefs, function (name) {
			var path = $scope.getModulePaths(name);
			return Promise.all([name, fs.readdirAsync(path)])
		})
		.then(function (arrOfArraysOfModules){
			return PackageFactory.createPackages(arrOfArraysOfModules)
		})
		.then(function(user){
			console.log('user with/without packages', user);
			!user.packages.length ? $state.go('loggedIn.applicationSelector') : $state.go('loggedIn.moduleSelector')
		})
		.then(null, function(err){
    		console.error('Error', err);
   })

  };
})