var mongoose = require('mongoose');
// require(__dirname + '/db/models/file');
// require(__dirname + '/db/models/user');
var fs = require('fs');
var File = mongoose.model('File');
var User = mongoose.model('User');
var spawn = require('child_process').spawn;
// var exec = require('child-process-promise').exec;

window.thisApp.controller('LoggedInCtrl', function ($scope, $state, AccountEditFactory, FileManagerFactory, $rootScope) {

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
    })
  }

  $scope.updateAll = function(){
    $scope.files.forEach(function(file){
      $scope.updateFile(file)
    })
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

  $scope.getFileFromUser = function(){
    var filePrefs = $rootScope.currentUser.filePreferences;
    $scope.fileData = [];
    var filePaths = [];
    filePrefs.forEach(function(pref, ind){
      filePaths[ind] = process.env["HOME"]+ '/' + pref;
    })

    var child;
    filePaths.forEach(function(file, index){
      child = spawn("cat", [file])
      child.stdout.on('data', function(data){
          $scope.fileData.push({'name': filePrefs[index], 'content':data.toString(), 'path': filePaths[index]});
          console.log("scope.filedata inside while loop stringified", $scope.fileData.toString()); 
      })
    })

    //listen for end of child process
    //add file to user schema and file schema
    child.on('close', function(){
      console.log("scope.filedata", $scope.fileData);
      $scope.fileData.forEach(function(fileObj){
        FileManagerFactory.addFile(null, fileObj)
        .then(function(user){
          $scope.retrieveAllFiles();
        })
      })
    })

  }

})


