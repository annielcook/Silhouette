var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

window.thisApp.controller('PackageCtrl', function ($scope, $state, $rootScope, AccountEditFactory, PackageFactory) {
	$scope.packageOptions = ['npm', 'brew'];
	$scope.packagePrefs = [];

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


	var getModulePaths = function (name) {
		var path;
		if(name === 'brew') {
			path = '/usr/local/Cellar';
		} else if (name === 'npm') {
			path = '/usr/local/lib/node_modules';
		}
		return path;
	}

	var getAllModules = function () {
		Promise.map($scope.packagePrefs, function (name) {
			var path = getModulePaths(name);
			return Promise.all([name, path, fs.readdirAsync(path)])
		})
		.then(function (arrOfArraysOfModules){
			PackageFactory.createPackages(arrOfArraysOfModules)
		})
		// $scope.packagePrefs.forEach(function (pref){
		// 	var path = getModulePath(pref);

		// 	Promise.map()
		// })
	}


	//add packages to user packagePreferences as a array of strings
	//build paths to these packages
	//create new package objects
	//read directories into object
	$scope.main = function () {
		getAllModules();

	}



})