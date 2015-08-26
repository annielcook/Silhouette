window.thisApp.controller('InstallationCheckCtrl', function ($scope, $state, InstallationFactory) {
	$scope.commands = $state.params['needToInstall'].split(",");
	console.log('$state.params: ', $state.params);

		$scope.checkUserInstalled = function () {
			console.log('!: ', $state.params['fromState'])
			console.log('!: ', $state.params)
			var next = $state.params['fromState'] === "setUpEnv" ? "loggedIn.postInstallCheck" : "loggedIn.moduleManager";
			InstallationFactory.preInstallCheck()
			.then(function (needToInstall) {
				!needToInstall.length ? $state.go(next) : $state.go('loggedIn.installationCheck', {needToInstall : needToInstall})
			})

	}
})
