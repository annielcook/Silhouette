window.thisApp.controller('HomeCtrl', function ($scope, $rootScope, HomeFactory){
  $scope.currentUser = $rootScope.currentUser;
  HomeFactory.populateUser()
  .then(function(user){

	  console.log(user)
  })
})