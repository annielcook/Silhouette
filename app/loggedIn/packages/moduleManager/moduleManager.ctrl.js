var _ = require('lodash')
var exec = require('child_process').exec

window.thisApp.controller('ModuleManagerCtrl', function ($scope, $state, $rootScope, PackageFactory){
	PackageFactory.getPackages()
	.then(function(thePackages) {
		$scope.packages = thePackages;
		$scope.$digest();
	})

	$scope.uninstall = function (packageName, module) {
		//uninstall from computer by running a script
		var cmd = packageName + ' uninstall ' + module;
		exec(cmd, function (err, stdout, stderr) {
			if(err) return console.log('Error ', err);
			//call factory function to remove from user
			return PackageFactory.removeModule(packageName, module)
			.then(function () {
				PackageFactory.getPackages()
				.then(function(thePackages) {
					$scope.packages = thePackages;
					$scope.$digest();
				})
			})
		})
	}


})