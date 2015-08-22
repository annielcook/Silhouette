var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

window.thisApp.controller('PackageSelectorCtrl', function ($scope, $state, $rootScope, AccountEditFactory, PackageFactory) {
	$scope.packageOptions = ['npm', 'brew'];
	$scope.packagePrefs = [];

	//handles the toggle on the package selector state
	$scope.addPackagePreference = function(packagename){
		$scope.packagePrefs = PackageFactory.addPackagePrefs(packagename, $scope.packagePrefs);
	}

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
			!user.packages.length ? $state.go('loggedIn.applicationSelector') : $state.go('loggedIn.packageManager')
		})
		.then(null, function(err){
    		console.error('Error', err);
     })
	}

})