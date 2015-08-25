window.thisApp.controller('InstallationCheckCtrl', function ($scope, $state, InstallationFactory) {
	$scope.commands = $state.params['needToInstall'].split(",");
	console.log('$state.params: ', $state.params);

		$scope.checkUserInstalled = function () {
			console.log('i have been called!')
			InstallationFactory.preInstallCheck()
			.then(function (needToInstall) {
				console.log('needtoinstall: ', needToInstall)
				!needToInstall.length ? $state.go('loggedIn.moduleManager') : $state.go('loggedIn.installationCheck', {needToInstall : needToInstall})
			})

	}
})
