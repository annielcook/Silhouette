var mongoose = require('mongoose');
var File = mongoose.model('File');
var User = mongoose.model('User');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

window.thisApp.controller('FileManagerCtrl', function ($scope, $state, AccountEditFactory, FileManagerFactory, $rootScope) {

  $scope.saveAccountChanges = AccountEditFactory.saveUserChanges;

  // retrieves current user's files
  $scope.retrieveAllFiles = function(){
    FileManagerFactory.getAllFiles()
    .then(function(files){
      $scope.files = files;
      $scope.$digest();
    });
  }

  //display all files upon loading
  $scope.retrieveAllFiles()

  //upload a file and update the files displayed
  $scope.uploadFile = function(event){
    FileManagerFactory.addFile(event)
    .then(function(user){
      $scope.retrieveAllFiles();
    })
  }
  
 $scope.fileOptions = ['.bashrc', '.bash_profile', '.gitconfig', '.zshrc'];
 $scope.filePrefs = [];
  $scope.addFilePreference = function(filename){
    $scope.filePrefs = FileManagerFactory.addFilePrefs(filename, $scope.filePrefs);
  }

  $scope.removeFile = function(file){
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
    })
    .then(null, function(error){
      console.log(error);
    })
  }

  $scope.downloadAllFiles = function(){
    $scope.files.forEach(function(file){
      $scope.downloadFile(file);
    })
  }
  
  //get file preferences from user upon signup
  $scope.addFilePrefToUser = function(){
    $rootScope.currentUser.filePreferences = $scope.filePrefs;
    AccountEditFactory.saveUserChanges();
    //child process that reads files from user 
    $scope.getFilePaths();
    //go to file manager state
    $state.go('loggedIn.packageSelector');
  } 

  $scope.getFilePaths = function(){
  $scope.filePaths = [];
  $scope.filePrefs = $rootScope.currentUser.filePreferences;
    $scope.fileData = [];
   
    $scope.filePrefs.forEach(function(pref, ind){
      $scope.filePaths[ind] = process.env["HOME"]+ '/' + pref;
    })
    
    $scope.addFilesToUser();
  }

  $scope.addFilesToUser = function(){
     Promise.map($scope.filePaths, function(path, index){
      return Promise.all([fs.readFileAsync(path, "utf8"), path, $scope.filePrefs[index]])
    })
    .then(function(content){
      $scope.fileData = content;
      $scope.fileData.forEach(function(fileArray){
        FileManagerFactory.addFile(null, fileArray)
        .then(function(createdUser){
          $scope.retrieveAllFiles()
        })
      })
    })
  }


})


