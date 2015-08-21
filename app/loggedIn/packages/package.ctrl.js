window.thisApp.controller('PackageCtrl', function ($scope) {
	$scope.packageOptions = ['npm', 'brew'];
	$scope.packagePrefs = [];

	$scope.addPackagePreference = function (packagename) {
		var packageIndex = $scope.packagePrefs.indexOf(packagename);
		if(packageIndex === -1){
			$scope.packagePrefs.push(packagename);
		} else {
			$scope.packagePrefs.splice(packageIndex, 1);
		}
		return packagePrefs;
	}
	$scope.addPackagePreferenceToUser = function () {
		$rootScope.currentUser.packagePreferences = $scope.packagePrefs;
    AccountEditFactory.saveUserChanges();
    //child process that reads files from user 
    $scope.createPackageFile();
    //go to file manager state
    $state.go('loggedIn.fileManager');
	}

})