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
			ApplicationFactory.addAppsToUser(chosenApps)
			.then(function(apps){
				$scope.updateCurrentApps();
				$scope.$digest();
			});
		})
		
	}

	$scope.removeApp = function(app){
		console.log("app: ", app)
		app.tracking = false
		ApplicationFactory.toggleFollow(app)
		.then(function(app){
			console.log("app after factory: ", app)
	      $scope.updateCurrentApps();
	   })
	}

	$scope.addApp = function(app){
		console.log("app: ", app)
		app.tracking = true
		ApplicationFactory.toggleFollow(app)
		.then(function(app){
			console.log("app after factory: ", app)
	      $scope.updateCurrentApps();
	   })

	}

	$scope.installApp = function(app){
		ApplicationFactory.installApp(app.name);
	}

	$scope.installAllApps = function(){
		InstallationFactory.installAllApps();
	}

})