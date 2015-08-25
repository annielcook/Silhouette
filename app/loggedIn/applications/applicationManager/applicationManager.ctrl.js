var mongoose = require('mongoose');
var User = mongoose.model('User');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var _ = require('lodash');

window.thisApp.controller('ApplicationCtrl', function ($scope, $state, $rootScope, ApplicationFactory, InstallationFactory) {

	$scope.updateCurrentApps = function(){
		return 	ApplicationFactory.retrieveCurrentApps()
		.then(function(apps){
			$scope.currentCask = apps;
			$scope.$digest();
		})
	}
	
	$scope.updateCurrentApps()

	$scope.syncAppsFromComputer = function(){
		ApplicationFactory.uploadFinderInstalled()
		.then(function(apps){
			var finderApps = apps
			var caskApps = ApplicationFactory.uploadCaskInstalled()
			var chosenApps = _.uniq(finderApps.concat(caskApps))
			console.log("chosenApps: ", chosenApps)
			ApplicationFactory.addAppsToUser(chosenApps)
			.then(function(apps){
				console.log("apps from factory: ", apps)
				$scope.updateCurrentApps();
				$scope.$digest();
			});
		})
		
	}

	$scope.removeApp = function(app){
		ApplicationFactory.deleteApp(app)
	    .then(function(user){
	      $scope.updateCurrentApps();
	    })
	}

	$scope.installApp = function(app){
		ApplicationFactory.installApp(app.name);
	}

	$scope.installAllApps = function(){
		console.log('installing all apps!!');
		InstallationFactory.installAllApps();
	}

})