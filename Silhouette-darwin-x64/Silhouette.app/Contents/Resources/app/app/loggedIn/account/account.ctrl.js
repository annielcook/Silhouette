window.thisApp.controller('AccountCtrl', function ($scope, $state, AccountEditFactory) {
	  $scope.saveAccountChanges = function(editeduser){
		  AccountEditFactory.saveUserChanges(editeduser)
		  .then(function(){
		  	$state.go('loggedIn.account')
		  })
	  }
})
