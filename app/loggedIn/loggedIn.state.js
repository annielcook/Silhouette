
app.config(function ($stateProvider) {
	$stateProvider.state('loggedIn', {
		templateUrl: 'file://'+__dirname+'/app/loggedIn/loggedIn.html',
		controller: 'LoggedInCtrl',
	})
	.state('loggedIn.account', {
		templateUrl: __dirname + '/app/loggedIn/account/account.html'
	})
	.state('loggedIn.fileManager', {
		templateUrl: __dirname + '/app/loggedIn/fileManager/fileManager.html'
	})
	.state('loggedIn.social', {
		templateUrl: __dirname + '/app/loggedIn/social.html'
	})
	.state('loggedIn.accountEdit', {
		templateUrl: __dirname + '/app/loggedIn/account/accountEdit.html'
	})
	.state('loggedIn.fileSelector', {
		templateUrl: __dirname + '/app/loggedIn/fileSelector/fileSelector.html'
	})
})