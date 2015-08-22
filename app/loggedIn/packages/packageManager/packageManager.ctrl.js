var _ = require('lodash')

window.thisApp.controller('PackageManagerCtrl', function ($scope, $state, $rootScope, AccountEditFactory, PackageFactory) {
  // console.log('State params package info: ',$stateParams.packageInfo)
  //$scope.packageArr = JSON.parse($stateParams.packageInfo);
  //console.log('scope.packageArr',  $scope.packageArr);
  $scope.getPackageInfo = function(){
  	PackageFactory.getPackages()
  	.then(function(packages){
  		//$scope.packageArr = packages;
  		// console.log('$scope.packageArr', packages);
		  $scope.moduleSelections = {'npm': packages[0].modules, 'brew': packages[1].modules};
		  $scope.moduleOptions = _.clone($scope.moduleSelections, true)
  		$scope.$digest();
  	})
  }
  $scope.getPackageInfo();

  $scope.checked=true;



  $scope.addModulePreference = function(packageName, module){
  	 $scope.moduleSelections = PackageFactory.toggleModuleSelections(packageName, module, $scope.moduleSelections);
  	 // console.log('Module Selections: ', $scope.moduleSelections)
  	 //  console.log('Module Options: ', $scope.moduleOptions)
  }

  $scope.saveModulePrefs = function(){
    console.log('Module Selections: ', $scope.moduleSelections)
  	PackageFactory.updatePackages($scope.moduleSelections)
  	.then(function (user) {
  		console.log('updated user: ', user)
	  	$state.go('loggedIn.applicationSelector');
  	})
  	.then(null, function (err) {
  		console.error('Error: ', err)
  	})

  }
});