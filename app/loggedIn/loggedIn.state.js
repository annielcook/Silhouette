window.thisApp.config(function ($stateProvider) {
	$stateProvider.state('loggedIn', {
		templateUrl: __dirname + '/loggedIn.html',
		controller: 'LoggedInCtrl',
	})
	.state('loggedIn.account', {
		templateUrl: __dirname + '/account/account.html'
	})
	.state('loggedIn.fileManager', {
		templateUrl: __dirname + '/files/fileManager/fileManager.html',
		controller: 'FileManagerCtrl'
	})
	.state('loggedIn.applicationManager', {
		templateUrl: __dirname + '/applications/applicationManager/applicationManager.html',
		controller: 'ApplicationCtrl'
	})
	.state('loggedIn.accountEdit', {
		templateUrl: __dirname + '/account/accountEdit.html',
		controller: 'AccountCtrl'
	})
	.state('loggedIn.fileSelector', {
		templateUrl: __dirname + '/files/fileSelector/fileSelector.html',
		controller: 'FileSelectorCtrl'
	})
	.state('loggedIn.packageSelector', {
		templateUrl: __dirname + '/packages/packageSelector/packageSelector.html',
		controller: 'PackageSelectorCtrl'
	})
	.state('loggedIn.applicationSelector', {
		templateUrl: __dirname + '/applications/applicationSelector/applicationSelector.html',
		controller: 'ApplicationSelectorCtrl'
	})
	.state('loggedIn.moduleSelector', {
		templateUrl: __dirname + '/packages/moduleSelector/moduleSelector.html',
		controller: 'ModuleSelectorrCtrl'
	})
	.state('loggedIn.moduleManager', {
		templateUrl: __dirname + '/packages/moduleManager/moduleManager.html',
		controller: 'ModuleManagerCtrl'
	})
	.state('loggedIn.home', {
		templateUrl: __dirname + '/home/home.html',
		controller: 'HomeCtrl'
	})

}) 
