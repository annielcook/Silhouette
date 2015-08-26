var mongoose = require('mongoose');
var User = mongoose.model('User');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var _ = require('lodash');

window.thisApp.controller('ApplicationCtrl', function ($scope, $state, $rootScope, ApplicationFactory, InstallationFactory) {

	$scope.icons = ['firefox','github', 'chrome', 'google', 'skype', 'spotify', 'bitcoin', 'dropbox', 'slack', 'whatsapp']

	// { 
	// 	'firefox': 'firefox',
	// 	'github-desktop': 'github',
	// 	'google-chrome': 'chrome',
	// 	'google-drive': 'google',
	// 	'skype' : 'skype',
	// 	'spotify': 'spotify',
	// 	'bitcoin-core':'bitcoin',
	// 	'dropbox': 'dropbox',
	// 	'slack': 'slack'
	// 	'whatsapp' : 'whatsapp',
	// }

	$scope.updateCurrentApps = function(){
		return 	ApplicationFactory.retrieveCurrentApps()
		.then(function(apps){
			$scope.currentCask = apps;
			// // return array with just the names of the current apps
			// $scope.currentUploadedNames = []
			// $scope.currentCask.forEach(function(appObj){
			// 	console.log("appObj.name: ", appObj.name)
			// 	$scope.currentUploadedNames.push(appObj.name)
			// })
			// console.log("$scope.currentUploadedNames: ", $scope.currentUploadedNames)
			$scope.$digest();
		})
	}
	
	$scope.updateCurrentApps()

	$scope.syncAppsFromComputer = function(){
		ApplicationFactory.uploadFinderInstalled()
		.then(function(apps){
			// define apps listed in user's finder and brew cask, then a list of both without repeats
			var finderApps = apps
			var caskApps = ApplicationFactory.uploadCaskInstalled()
			var chosenApps = _.uniq(finderApps.concat(caskApps))

			console.log("$scope.updateCurrent: ", $scope.currentCask)

			// return array with just the names of the current apps
			// $scope.currentUploadedNames = []
			// $scope.currentCask.forEach(function(appObj){
			// 	console.log("appObj.name: ", appObj.name)
			// 	$scope.currentUploadedNames.push(appObj.name)
			// })
			// $scope.$digest()
			// console.log("$scope.currentUploadedNames: ", $scope.currentUploadedNames)
			
			var appsToAdd = chosenApps
			// console.log("$scope.currentUploadedNames: ", $scope.currentUploadedNames)

			// var appsToAdd = _.difference(chosenApps, $scope.currentUploadedNames)
			console.log("appsToAdd: ", appsToAdd)

			
			// var appsToAdd = []
			// var nonDuplicateApps = chosenApps.forEach(function(app){
			// 	var indexOfMatch = $scope.currentUploadedNames.indexOf(app)
			// 	if (indexOfMatch != -1) appsToAdd.push($scope.currentUploadedNames[indexOfMatch]);
			// })
			ApplicationFactory.addAppsToUser(appsToAdd)
			.then(function(apps){
				console.log("current apps: ", apps)
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
		ApplicationFactory.installApp(app)
	}

	$scope.installAllApps = function(){
		InstallationFactory.installAllApps();
	}

})