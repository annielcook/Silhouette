window.thisApp.controller('HomeCtrl', function ($scope, $rootScope, HomeFactory){
  $scope.currentUser = $rootScope.currentUser;
  HomeFactory.populateUser()
  .then(function(user){
  	$scope.leaderboard = [
	  	{name: 'Files', number: user.files.length}, 
	  	{name: 'Modules', number: (user.packages[0].modules.length + user.packages[1].modules.length)},
	  	{name: 'Applications', number: user.applications.length}
  	]
  	$scope.$digest();
  })
})