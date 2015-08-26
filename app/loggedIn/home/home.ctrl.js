var _= require('lodash');

window.thisApp.controller('HomeCtrl', function ($scope, $rootScope, HomeFactory){
  $scope.currentUser = $rootScope.currentUser;
  var applications = [];
  HomeFactory.populateUser()
  .then(function(user){
    console.log('user', user)
    _.each(user.applications, function(app){
        if(app.tracking === true) applications.push(app)
    })
  	$scope.leaderboard = [
	  	{name: 'Files', number: user.files.length}, 
	  	{name: 'Modules', number: (user.packages[0].modules.length + user.packages[1].modules.length)},
	  	{name: 'Applications', number: applications.length}
  	]
  	$scope.$digest();
  })
})