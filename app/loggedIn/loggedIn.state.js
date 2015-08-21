window.thisApp.config(function ($stateProvider) {
	$stateProvider.state('loggedIn', {
		templateUrl: __dirname + '/loggedIn.html',
		controller: function ($scope, $state, AccountEditFactory, FileManagerFactory, $rootScope) {
		  $scope.saveAccountChanges = AccountEditFactory.saveUserChanges;
		}
	})
	.state('loggedIn.account', {
		templateUrl: __dirname + '/account/account.html'
	})
	.state('loggedIn.fileManager', {
		templateUrl: __dirname + '/files/fileManager/fileManager.html',
		controller: 'FileManagerCtrl'
	})
	.state('loggedIn.accountEdit', {
		templateUrl: __dirname + '/account/accountEdit.html'
	})
	.state('loggedIn.fileSelector', {
		templateUrl: __dirname + '/files/fileSelector/fileSelector.html',
		controller: 'fileCtrl',
		controller: 'FileSelectorCtrl'
	})
	.state('loggedIn.packageSelector', {
		templateUrl: __dirname + '/packages/packageSelector/packageSelector.html',
		controller: 'packageCtrl'
	})
})