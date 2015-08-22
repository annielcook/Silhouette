var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var _= require('lodash');

window.thisApp.controller('FileSelectorCtrl', function ($scope, FileManagerFactory, AccountEditFactory, $rootScope, $state) {

  $scope.checked = true;
  var allFileOpts = ['.bashrc', '.bash_profile', '.gitconfig', '.zshrc'];
	// $scope.fileOptions = ['.bashrc', '.bash_profile', '.gitconfig', '.zshrc'];


  $scope.readFilesForSelection = function(){
    fs.readdirAsync(process.env["HOME"])
    .then(function(fileDirectoryArray){
      $scope.fileOptions = _.filter(fileDirectoryArray, function(name){
        if (_.contains(allFileOpts, name)){ return name}
      })
      $scope.filePrefs = _.clone($scope.fileOptions);
      console.log('$scope.fileprefs', $scope.filePrefs);
      $scope.$digest();
    })
  }
  $scope.readFilesForSelection ();


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

	$scope.addFilePreference = function(filename){
    console.log('$scope.filePrefs before toggle', $scope.filePrefs);
    $scope.filePrefs = FileManagerFactory.addFilePrefs(filename, $scope.filePrefs);
    console.log('$scope.filePrefs after toggle', $scope.filePrefs);
  }
    //get file preferences from user upon signup
  $scope.addFilePrefToUser = function(){
    console.log('files to save to user ', $scope.filePrefs);
    $rootScope.currentUser.filePreferences = $scope.filePrefs;
    AccountEditFactory.saveUserChanges();
    // console.log('updated user in files:', $rootScope.currentUser);
    getFilePaths();
    //go to file manager state
    $state.go('loggedIn.packageSelector');
  } 

})
