window.thisApp.controller('PackageManagerCtrl', function ($scope, $state, $rootScope, AccountEditFactory, PackageFactory, $stateParams) {
  $scope.moduleNames = JSON.parse($stateParams.packageNames);
  $scope.packageNames = ['npm', 'brew'];
  console.log('scope.packageNames',  $scope.packageNames);
});