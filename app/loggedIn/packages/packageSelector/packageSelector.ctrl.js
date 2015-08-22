var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

window.thisApp.controller('PackageSelectorCtrl', function ($scope, $state, $rootScope, AccountEditFactory, PackageFactory) {
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
			return Promise.all([name, path, fs.readdirAsync(path)])
		})
		.then(function (arrOfArraysOfModules){
			return PackageFactory.createPackages(arrOfArraysOfModules)
		})
		// .then(function(user){
		// 	return Promise.all(
		// 		user.packages.map(function(model){
		// 			console.log('model', model);
		// 			// $scope.packageInfo.push(model)
		// 	}))
		// })
		.then(function(){
			// console.log('packageInfo in get All Modules', $scope.packageInfo);
			// var packageInfo = JSON.stringify($scope.packageInfo.map(function(arr){
			// 	console.log('arr', arr)
			// 	return [arr.name, arr.modules];
			// 	}))
			// console.log('package info: ', packageInfo)
			// $state.go('loggedIn.packageManager', {'packageInfo': packageInfo});
			$state.go('loggedIn.packageManager');
		})
		.then(null, function(err){
    		console.error('Error', err);
     })
	}

})