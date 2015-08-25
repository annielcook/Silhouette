var _ = require('lodash');
var exec = require('child_process').exec;

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

	$scope.checkInstalls = function (packageName, module) {
		InstallationFactory.preInstallCheck()
		.then(function (needToInstall) {
			var func;
			!arguments.length ? func = InstallationFactory.installAllPackages : func = $scope.install;
			!needToInstall.length ? func(packageName, module) : $state.go('loggedIn.installationCheck', {needToInstall : needToInstall})
		})

	}

	$scope.install = function (packageName, module) {
		console.log('module:'+module+'packagename'+packageName)
	  var global = "";
	  (packageName === 'npm') ? (global = ' -g') : (global = '');
		var cmd = packageName + global + ' install ' + module;
		console.log('command: ', cmd)
		exec(cmd, function (err, stdout, stderr) {
			if(err) return console.log('Error ', err);
			return console.log(packageName + ' has been successfully installed!')
		})
	}


})