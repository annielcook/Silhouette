var _ = require('lodash')
var exec = require('child_process').exec

window.thisApp.controller('ModuleManagerCtrl', function ($scope, $state, $rootScope, PackageFactory, InstallationFactory){
	PackageFactory.getPackages()
	.then(function(thePackages) {
		$scope.packages = thePackages;
		console.log('scope.packages: ',$scope.packages)
		$scope.$digest();
	})

	$scope.removeModule = function (packageName, module) {
		//call factory function to remove from user
		PackageFactory.removeModule(packageName, module)
		.then(function () {
			PackageFactory.getPackages()
			.then(function(thePackages) {
				$scope.packages = thePackages;
				$scope.$digest();
			})
		})
	}

	$scope.uninstall = function (packageName, module) {
		//uninstall from computer by running a script
		var cmd = packageName + ' uninstall ' + module;
		exec(cmd, function (err, stdout, stderr) {
			if(err) return console.log('Error ', err);
			return $scope.removeModule(packageName, module);
		})
	}

	$scope.install = function (packageName, module) {
		//install from computer by running a script
		var cmd = packageName + ' install ' + module;
		exec(cmd, function (err, stdout, stderr) {
			if(err) return console.log('Error ', err);
			return console.log(packageName + ' has been successfully installed!')
		})
	}

	$scope.installAll = function () {
		// $scope.packages.forEach(function (pack) {
		// 	pack.modules.forEach(function (mod) {
		// 		var cmd = pack.name + ' install ' + mod;
		// 		exec(cmd, function (err, stdout, stderr) {
		// 			if(err) return console.log('Error ', err);
		// 			console.log(pack.name + ' has been successfully installed!')
		// 		})
		// 	})
		// })
		InstallationFactory.installAllPackages();
	}


})