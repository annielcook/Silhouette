// var mongoose = require('mongoose');
// var File = mongoose.model('File');
// var User = mongoose.model('User');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

window.thisApp.controller('FileSelectorCtrl', function(FileManagerFactory, $scope, $rootScope, $state){
 
 $scope.fileOptions = ['.bashrc', '.bash_profile', '.gitconfig', '.zshrc'];
 $scope.filePrefs = [];

  // retrieves current user's files
  $scope.retrieveAllFiles = function(){
    FileManagerFactory.getAllFiles()
    .then(function(files){
      $scope.files = files;
      $scope.$digest();
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
    $state.go('loggedIn.packageSelector');
  } 

  $scope.getFileFromUser = function($rootScope, FileManagerFactory){
    var filePrefs = $rootScope.currentUser.filePreferences;
    $scope.fileData = [];
    var filePaths = [];
   
    filePrefs.forEach(function(pref, ind){
      filePaths[ind] = process.env["HOME"]+ '/' + pref;
    })

    Promise.map(filePaths, function(path, index){
      return Promise.all([fs.readFileAsync(path, "utf8"), path, filePrefs[index]])
    })
    .then(function(content){
      $scope.fileData = content;
      $scope.fileData.forEach(function(fileArray){
        console.log('fileArray', fileArray);
        FileManagerFactory.addFile(null, fileArray)
        .then(function(createdUser){
          console.log('createdUser', createdUser);
          $scope.retrieveAllFiles();
        })
      })
      console.log('$scope.fileData', $scope.fileData);
    })
    
  }

})