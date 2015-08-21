// var mongoose = require('mongoose');
// // var File = mongoose.model('File');
// var User = mongoose.model('User');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

window.thisApp.controller('FileSelectorCtrl', function(AccountEditFactory, FileManagerFactory, $scope, $rootScope, $state){
 
 $scope.fileOptions = ['.bashrc', '.bash_profile', '.gitconfig', '.zshrc'];
 $scope.filePrefs = [];

  // retrieves current user's files
  $scope.retrieveAllFiles = function(){
    console.log('getting called');
    FileManagerFactory.getAllFiles()
    .then(function(files){
      console.log('files here:', files);
      $scope.files = files;
      $scope.$digest();
      console.log('updated user', $rootScope.currentUser);
    });
  }

 $scope.addFilePreference = function(filename){
    $scope.filePrefs = FileManagerFactory.addFilePrefs(filename, $scope.filePrefs);
 }

 //get file preferences from user upon signup
  $scope.addFilePrefToUser = function(){
    $rootScope.currentUser.filePreferences = $scope.filePrefs;
    AccountEditFactory.saveUserChanges();
    //child process that reads files from user 
    $scope.getFileFromUser();
    //go to file manager state
    $state.go('loggedIn.fileManager');
  } 

  $scope.filePaths = [];
  $scope.filePrefs = $rootScope.currentUser.filePreferences;
  $scope.getFileFromUser = function(){
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
          $scope.retrieveAllFiles();
        })
      })
    })
  }

})