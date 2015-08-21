var mongoose = require('mongoose');
var File = mongoose.model('File');
var User = mongoose.model('User');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

window.thisApp.controller('LoggedInCtrl', function ($scope, $state, AccountEditFactory, FileManagerFactory, $rootScope) {

  $scope.saveAccountChanges = AccountEditFactory.saveUserChanges;

  // retrieves current user's files
  $scope.retrieveAllFiles = function(){
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


