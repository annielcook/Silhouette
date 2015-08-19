var mongoose = require('mongoose');
// var databaseURI = 'mongodb://silhouette:silhouette1506@ds031893.mongolab.com:31893/silhouette';
// var db = mongoose.connect(databaseURI).connection;
require(__dirname + '/db/models/file');
require(__dirname + '/db/models/user');
var fs = require('fs');
var File = mongoose.model('File');
var User = mongoose.model('User');

app.controller('LoggedInCtrl', function ($scope, $state, AccountEditFactory, FileManagerFactory, $rootScope) {

  //
  $scope.saveAccountChanges = AccountEditFactory.saveUserChanges;

  // retrieves current user's files
  $scope.retrieveAllFiles = function(){
    // $scope.files = FileManagerFactory.getAllFiles()
    FileManagerFactory.getAllFiles()
    .then(function(files){
      $scope.files = files
      $scope.$digest()
    });
    }

  //display all files upon loading
  $scope.retrieveAllFiles()

  //upload a file and update the files displayed
  $scope.uploadFile = function(event){
<<<<<<< HEAD
    FileManagerFactory.addFile(event);
    $scope.retrieveAllFiles();
=======

    FileManagerFactory.addFile(event)
    .then(function(user){
      $scope.retrieveAllFiles();
    })
>>>>>>> master
  }
  
  var fileOptions = ['.bashrc', '.bash_profile', '.gitconfig', '.npm folder', '.zshrc', '.oh-my-zsh', '.nvm'];
  
  $scope.addFilePreference = function(){
    var filePrefs = FileManagerFactory.addFilePrefs();
  }

  $scope.removeFile = function(file){
    console.log("file id to be removed: ", file.id)
    FileManagerFactory.deleteFile(file.id)
  }

  $scope.addFilePrefToUser = function(){
    $rootScope.currentUser.filePreferences = filePrefs;
    console.log('about to save changes!');
    AccountEditFactory.saveUserChanges();
    //child process that finds entered files and reads them
    //adds them to user schema
    //sets up child process to track
    $state.go('loggedIn.fileManager');
  } 

})


