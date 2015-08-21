window.thisApp.config(function ($stateProvider) {
	$stateProvider.state('loggedIn', {
		templateUrl: __dirname + '/loggedIn.html',
		controller: 'FileManagerCtrl',
	})
	.state('loggedIn.account', {
		templateUrl: __dirname + '/account/account.html'
	})
	.state('loggedIn.fileManager', {
		templateUrl: __dirname + '/files/fileManager/fileManager.html',
	})
	.state('loggedIn.accountEdit', {
		templateUrl: __dirname + '/account/accountEdit.html'
	})
	.state('loggedIn.fileSelector', {
		templateUrl: __dirname + '/files/fileSelector/fileSelector.html',
	})
	.state('loggedIn.packageSelector', {
		templateUrl: __dirname + '/packages/packageSelector/packageSelector.html',
		controller: 'PackageCtrl'
	})
})