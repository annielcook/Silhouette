var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

window.thisApp.controller('FileSelectorCtrl', function ($scope, FileManagerFactory, AccountEditFactory, $rootScope, $state) {

  var addFilesToUser = function(){
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

  var getFilePaths = function(){
	  $scope.filePaths = [];
	  $scope.filePrefs = $rootScope.currentUser.filePreferences;
    $scope.fileData = [];
   
    $scope.filePaths = $scope.filePrefs.map(function(pref){
      return process.env["HOME"]+ '/' + pref;
    })
    
    addFilesToUser();
  }
  $scope.filePrefs = [];
	$scope.fileOptions = ['.bashrc', '.bash_profile', '.gitconfig', '.zshrc'];
	$scope.addFilePreference = function(filename){
    $scope.filePrefs = FileManagerFactory.addFilePrefs(filename, $scope.filePrefs);
  }
    //get file preferences from user upon signup
  $scope.addFilePrefToUser = function(){
    $rootScope.currentUser.filePreferences = $scope.filePrefs;
    AccountEditFactory.saveUserChanges();
    getFilePaths();
    //go to file manager state
    $state.go('loggedIn.packageSelector');
  } 

})
