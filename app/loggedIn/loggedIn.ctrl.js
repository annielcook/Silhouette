var mongoose = require('mongoose');
require(__dirname + '/db/models/file');
require(__dirname + '/db/models/user');
var fs = require('fs');
var File = mongoose.model('File');
var User = mongoose.model('User');
var spawn = require('child_process').spawn

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
    console.log('$rootScope.currentUser', $rootScope.currentUser);
    var filePrefs = $rootScope.currentUser.filePreferences;
    console.log('filePrefs', filePrefs);
    var child = spawn("cat", [process.env["HOME"]+'/.bash_profile', 'child'])
    var fileData = child.stdout.on('data', function(data){
      console.log('A child has been spawned here \n, heres the data: ', data.toString())
      return data.toString();
    })
    //call factory fxn with fileData
    //Create a new file object
  }

})


