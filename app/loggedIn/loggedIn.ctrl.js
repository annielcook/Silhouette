var mongoose = require('mongoose');
var File = mongoose.model('File');
var User = mongoose.model('User');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

window.thisApp.controller('LoggedInCtrl', function ($scope, $state, AccountEditFactory, FileManagerFactory, $rootScope) {


  // retrieves current user's files
  $scope.retrieveAllFiles = function(){
    FileManagerFactory.getAllFiles()
    .then(function(files){
      $scope.files = files
      $scope.$digest()
    });
  }

  //display all files upon loading
  $scope.retrieveAllFiles();


})


