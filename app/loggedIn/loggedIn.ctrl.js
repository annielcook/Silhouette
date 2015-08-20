var mongoose = require('mongoose');
require(__dirname + '/db/models/file');
require(__dirname + '/db/models/user');
var fs = require('fs');
var File = mongoose.model('File');
var User = mongoose.model('User');
var spawn = require('child_process').spawn;
// var exec = require('child-process-promise').exec;

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
    console.log("file id to be removed: ", file.id)
    FileManagerFactory.deleteFile(file.id)
    .then(function(user){
      $scope.retrieveAllFiles();
    })
  }

  $scope.updateFile = function(file){
    var child = spawn("cat", [file.path, 'child'])
    child.stdout.on('data', function(data){
      file.content = data.toString()
      file.date = new Date()
      FileManagerFactory.changeFile(file)
      .then(function(user){
        $scope.retrieveAllFiles();
      })
      return data.toString();
    })
  }

  $scope.updateAll = function(){
    $scope.files.forEach(function(file){
      $scope.updateFile(file)
    })
  }

  $scope.addFilePrefToUser = function(){
    $rootScope.currentUser.filePreferences = $scope.filePrefs;
    console.log('about to save changes!');
    console.log('$scope.filePrefs', $scope.filePrefs);
    AccountEditFactory.saveUserChanges();
    //child process that finds entered files and reads them
    //adds them to user schema
    //sets up child process to track

    $scope.getFileFromUser();
    $state.go('loggedIn.fileManager');
  } 

  $scope.getFileFromUser = function(){
    console.log('inside child fxn');
    //loop through file prefs from $rootScope.currentUser
    // console.log('$rootScope.currentUser', $rootScope.currentUser);
    var filePrefs = $rootScope.currentUser.filePreferences;
    // console.log('filePrefs', filePrefs);

    $scope.fileData = [];

    filePrefs.forEach(function(pref, ind){
      filePrefs[ind] = process.env["HOME"]+ '/' + pref;
    })

    var child;
    while(filePrefs.length){
      child = spawn("cat", [filePrefs.pop()])
      var fileData = child.stdout.on('data', function(data){
          // console.log("scope.filedata", $scope.fileData); this happens three times ???????
          $scope.fileData.push(data.toString());
      })
    }

    child.on('close', function(){
      console.log("scope.filedata", $scope.fileData);
    })

  }

})


