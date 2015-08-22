var mongoose = require('mongoose');
var User = mongoose.model('User');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

window.thisApp.controller('ApplicationCtrl', function ($scope, $state, $rootScope, ApplicationFactory) {

	$scope.uploadBrewCask = function(){
		ApplicationFactory.uploadCurrentCask()
		.then(function(apps){
			$scope.apps = apps;
			$scope.$digest();
		});
	}

	$scope.uploadFinderApps = function(){
		$scope.finderApps = ApplicationFactory.uploadFinderInstalled()
	}

})