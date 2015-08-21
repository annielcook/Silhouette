window.thisApp.controller('AccountCtrl', function ($scope, $state, AccountEditFactory) {
	  $scope.saveAccountChanges = function(){
		  AccountEditFactory.saveUserChanges()
		  .then(function(){
		  	$state.go('loggedIn.account')
		  })
	  }
})
