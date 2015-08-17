
app.config(function ($stateProvider) {
	$stateProvider.state('loggedIn', {
		url: '/loggedIn',
		templateUrl: 'file://'+__dirname+'/app/loggedIn/loggedIn.html',
		controller: 'LoggedInCtrl',
		resolve: {
			currentUser: function ($rootScope) {
				return $rootScope.currentUser;
			}
		}
	})
	.state('loggedIn.account', {
		url: '/account',
		templateUrl: __dirname + '/app/loggedIn/account.html'
	})
	.state('loggedIn.fileManager', {
		url: '/file-manager',
		templateUrl: __dirname + '/app/loggedIn/fileManager.html'
	})
	.state('loggedIn.social', {
		url: '/social',
		templateUrl: __dirname + '/app/loggedIn/social.html'
	})
})