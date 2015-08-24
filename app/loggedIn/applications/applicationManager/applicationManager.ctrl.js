var mongoose = require('mongoose');
var User = mongoose.model('User');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var exec = require('child_process').exec;

window.thisApp.controller('ApplicationCtrl', function ($scope, $state, $rootScope, ApplicationFactory) {

	$scope.updateCurrentApps = function(){
		return 	ApplicationFactory.retrieveCurrentApps()
		.then(function(apps){
			$scope.currentCask = apps;
			$scope.$digest();
		})
	}
	
	$scope.updateCurrentApps()


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

	$scope.installApp = function(app){
		var terminalCommand = "brew cask install " + app;
		exec(terminalCommand, function (err, stdout, stderr) {
			if(err) return console.log('Error ', err);
			return console.log(app + ' has been successfully installed!')
		})
	}

})