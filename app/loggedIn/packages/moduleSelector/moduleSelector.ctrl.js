var _ = require('lodash');

window.thisApp.controller('ModuleSelectorCtrl', function ($scope, $state, $rootScope, AccountEditFactory, PackageFactory) {
  $scope.getPackageInfo = function(){
    console.log('getting package Info!');
  	PackageFactory.getPackages()
  	.then(function(packages){
      $scope.moduleSelections = {};
        _.each(packages, function(packageItem){
        $scope.moduleSelections[packageItem.name] = packageItem.modules;
       })
		  $scope.moduleOptions = _.clone($scope.moduleSelections, true)
      console.log('$scope.moduleOptions', $scope.moduleOptions);
  		$scope.$digest();
  	})
  }
  $scope.getPackageInfo();

  $scope.checked=true;

  console.log('this file runs');
  //handles the toggle on the module selector state
  $scope.addModulePreference = function(packageName, module){
  	 $scope.moduleSelections = PackageFactory.toggleModuleSelections(packageName, module, $scope.moduleSelections);
  }

  $scope.saveModulePrefs = function(){
    console.log('Module Selections: ', $scope.moduleSelections)
  	PackageFactory.updatePackages($scope.moduleSelections)
  	.then(function (user) {
	  	$state.go('loggedIn.applicationSelector');
  	})
  	.then(null, function (err) {
  		console.error('Error: ', err)
  	})

  }
});