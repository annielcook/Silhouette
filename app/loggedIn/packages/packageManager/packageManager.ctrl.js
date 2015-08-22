window.thisApp.controller('PackageManagerCtrl', function ($scope, $state, $rootScope, AccountEditFactory, PackageFactory) {
  // console.log('State params package info: ',$stateParams.packageInfo)
  //$scope.packageArr = JSON.parse($stateParams.packageInfo);
  //console.log('scope.packageArr',  $scope.packageArr);
  $scope.getPackageInfo = function(){
  	PackageFactory.getPackages()
  	.then(function(packages){
  		$scope.packageArr = packages;
  		console.log('$scope.packageArr', $scope.packageArr);
  		$scope.$digest();
  	})
  }
  $scope.getPackageInfo();

  $scope.addPackagePreference = function(module){
  	 $scope.packageSelections = PackageFactory.addPackageSelections(module, $scope.packageSelections);
  }
});