var mongoose = require('mongoose');
var User = mongoose.model('User');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var exec = require('child_process').exec;
var _ = require('lodash');

window.thisApp.controller('ApplicationCtrl', function ($scope, $state, $rootScope, ApplicationFactory) {

	$scope.updateCurrentApps = function(){
		return 	ApplicationFactory.retrieveCurrentApps()
		.then(function(apps){
			$scope.currentCask = apps;
			$scope.$digest();
		})
	}
	
	$scope.updateCurrentApps()

	$scope.syncAppsFromComputer = function(){
		var finderApps = ApplicationFactory.uploadFinderInstalled()
		var caskApps = ApplicationFactory.uploadCaskInstalled()
		var chosenApps = _.uniq(finderApps.concat(caskApps))
		console.log("chosenApps: ", chosenApps)
		ApplicationFactory.addAppsToUser(chosenApps)
		.then(function(apps){
			console.log("apps from factory: ", apps)
			$scope.updateCurrentApps();
			$scope.$digest();
		});
	}

	$scope.removeApp = function(app){
		ApplicationFactory.deleteApp(app)
	    .then(function(user){
	      $scope.updateCurrentApps();
	    })
	}

	$scope.installApp = function(app){
		var terminalCommand = "brew cask install " + app;
		exec(terminalCommand, function (err, stdout, stderr) {
			if(err) return console.log('Error ', err);
			return console.log(app + ' has been successfully installed!')
		})
	}

})