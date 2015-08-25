var mongoose = require('mongoose');
var File = mongoose.model('File');
var User = mongoose.model('User');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

window.thisApp.controller('FileManagerCtrl', function ($scope, $state, AccountEditFactory, FileManagerFactory, $rootScope, InstallationFactory) {

  //upload a file and update the files displayed
  $scope.uploadFile = function(event){
    FileManagerFactory.addFile(event)
    .then(function(user){
      $scope.retrieveAllFiles();
    })
  }

  $scope.previewFile = function(file){
    if (!$scope.showPreviewPanel || file != $scope.fileBeingPreviewed) $scope.showPreviewPanel = true;
    else $scope.showPreviewPanel = false;
    $scope.fileBeingPreviewed = file;
  }

  $scope.updateFile = function(file){
    // var oldContent = file.content
    var newContent = fs.readFileSync(file.path, 'utf8').toString();
    if (newContent != file.content){
      file.content = newContent
      file.date = new Date();
      FileManagerFactory.changeFile(file)
      .then(function(user){
        $scope.retrieveAllFiles();
      })
    }
    
  }

  $scope.downloadFile = function(file){
    return fs.writeFileAsync(file.path, file.content)
    .then(null, function(error){
      console.log(error);
    })
  }

  $scope.removeFile = function(file){
    $scope.showPreviewPanel = false;
    FileManagerFactory.deleteFile(file.id)
    .then(function(user){
      $scope.retrieveAllFiles();
    })
  }

  $scope.updateAll = function(){
    $scope.files.forEach(function(file){
      $scope.updateFile(file);
    })
  }

  $scope.downloadAllFiles = function(){
    console.log('button clicked!');
    InstallationFactory.installAllFiles();
  }


})


