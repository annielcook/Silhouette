var mongoose = require('mongoose');
var User = mongoose.model('User');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

window.thisApp.controller('ApplicationCtrl', function ($scope, $state, $rootScope, ApplicationFactory) {

	$scope.updateCurrentApps = function(){
		return 	ApplicationFactory.retrieveCurrentApps()
		.then(function(apps){
			$scope.currentCask = apps;
			$scope.$digest();
		})
	}


	$scope.uploadBrewCask = function(){
		var cask = fs.readdirSync("/opt/homebrew-cask/Caskroom")
		ApplicationFactory.updateCurrentCask(cask)
		.then(function(apps){
			$scope.currentCask = apps;
			console.log("current cask updated")
			$scope.$digest();
		});
	}

	$scope.uploadFinderApps = function(){
		var finderApps = ApplicationFactory.uploadFinderInstalled()
		var appsToAdd = ApplicationFactory.availableApps(finderApps);
		ApplicationFactory.updateCurrentCask(appsToAdd)
		.then(function(apps){
			$scope.currentCask = apps;
			console.log("current cask updated")
			$scope.$digest();
		});
	}

	$scope.removeApp = function(app){
		ApplicationFactory.deleteApp(app)
    .then(function(user){
      $scope.updateCurrentApps();
    })
	}

})