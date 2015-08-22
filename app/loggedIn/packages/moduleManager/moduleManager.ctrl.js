var _ = require('lodash')
window.thisApp.controller('ModuleManagerCtrl', function ($scope, $state, $rootScope, PackageFactory){
	PackageFactory.getPackages()
	.then(function(thePackages) {
		$scope.packages = thePackages;
		$scope.$digest();
	})

})