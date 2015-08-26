window.thisApp.controller('HomeCtrl', function ($scope, $rootScope, HomeFactory){
  $scope.currentUser = $rootScope.currentUser;
  HomeFactory.populateUser()
  .then(function(user){
  	$scope.leaderboard = [
	  	{name: 'Files', number: user.files.length}, 
	  	{name: 'Packages', number: user.packages.length},
	  	{name: 'Applications', number: user.applications.length}
  	]
  	$scope.$digest();
  })
})