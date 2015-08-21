// var mongoose = require('mongoose');
// var File = mongoose.model('File');
// var User = mongoose.model('User');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

window.thisApp.controller('FileManagerCtrl', function ($scope, FileManagerFactory, $rootScope) {
   // retrieves current user's files
  $scope.retrieveAllFiles = function(){
    FileManagerFactory.getAllFiles()
    .then(function(files){
      $scope.files = files;
      $scope.$digest();
    });
  }

  //display all files upon loading
  $scope.retrieveAllFiles();

  //upload a file and update the files displayed
  $scope.uploadFile = function(event){
    FileManagerFactory.addFile(event)
    .then(function(user){
      $scope.retrieveAllFiles();
    })
  }

  $scope.removeFile = function(file){
    console.log("file id to be removed: ", file.id)
    $scope.showPreviewPanel = false;
    FileManagerFactory.deleteFile(file.id)
    .then(function(user){
      $scope.retrieveAllFiles();
    })
  }

  $scope.previewFile = function(file){
    if (!$scope.showPreviewPanel || file != $scope.fileBeingPreviewed) $scope.showPreviewPanel = true;
    else $scope.showPreviewPanel = false;
    $scope.fileBeingPreviewed = file;
    console.log("file: ", file)
  }

  $scope.updateFile = function(file){
    file.content = fs.readFileSync(file.path, 'utf8').toString();
    file.date = new Date();
    FileManagerFactory.changeFile(file)
    .then(function(user){
      $scope.retrieveAllFiles();
    })
  }

  $scope.updateAll = function(){
    $scope.files.forEach(function(file){
      $scope.updateFile(file);
    })
  }

  $scope.downloadFile = function(file){
    return fs.writeFileAsync(file.path, file.content)
    .then(function(){
      console.log("file was written");
    })
    .then(null, function(error){
      console.log(error);
    })
  }

  $scope.downloadAllFiles = function(){
    console.log("$scope.files: ", $scope.files)
    $scope.files.forEach(function(file){
      $scope.downloadFile(file);
    })
  }
  
})
