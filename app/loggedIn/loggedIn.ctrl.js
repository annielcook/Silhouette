var mongoose = require('mongoose');
// var databaseURI = 'mongodb://silhouette:silhouette1506@ds031893.mongolab.com:31893/silhouette';
// var db = mongoose.connect(databaseURI).connection;
require(__dirname + '/db/models/file');
require(__dirname + '/db/models/user');
var fs = require('fs');
var File = mongoose.model('File');
var User = mongoose.model('User');

app.controller('LoggedInCtrl', function ($scope, $state, AccountEditFactory, $rootScope) {

  // $scope.uploadFile = FileManagerFactory.uploadFile;

  $scope.saveAccountChanges = AccountEditFactory.saveUserChanges;

  // retrieves current user's files
  $scope.retrieveAllFiles = function (){
    return User.find({email: $rootScope.currentUser.email})
    .populate('files')
    .then(function(user){
      return user[0].files})
    .then(function(files){
      $scope.files = files
      $scope.$digest()
    })
    .then(null, function(error){
      console.log(error)
    })
  }
  $scope.retrieveAllFiles()

  $scope.uploadFile = function(event){
    var file = event.target.files[0];
    var data = fs.readFileSync(file.path, 'utf8');
    File.create({'name': file.name, 'content': data, 'path': file.path})
    .then(function(createdFile){
      return User.findOneAndUpdate({email: $rootScope.currentUser.email}, {$push: {files: createdFile} }, {new : true})
    })
    .then(function(){
      $scope.retrieveAllFiles()
    })
    .then(null, function (err) {
      throw err;
    });
  }

  $scope.fileOptions = ['.bashrc', '.bash_profile', '.gitconfig', '.npm folder', '.zshrc', '.oh-my-zsh', '.nvm'];
  $scope.filePrefs = [];
  $scope.addFilePreference = function(filename) {
    var fileIndex = $scope.filePrefs.indexOf(filename);
    if(fileIndex === -1){
      $scope.filePrefs.push(filename);
    } else {
      $scope.filePrefs.splice(fileIndex, 1);
    }
   }
  $scope.addFilePrefToUser = function(){
    console.log('inside addFilePrefToUser fxn');
    $rootScope.currentUser.filePreferences = $scope.filePrefs;
    console.log('about to save changes!');
    AccountEditFactory.saveUserChanges();
    //child process that finds entered files and reads them
    //adds them to user schema
    //sets up child process to track
    $state.go('loggedIn.fileManager');
  } 

})


// app.factory('FileManagerFactory', function($rootScope){
//   // return{
//   //   uploadFile :function(event){
//   //     var file = event.target.files[0];
//   //     var data = fs.readFileSync(file.path, 'utf8');
//   //     File.create({'name': file.name, 'content': data, 'path': file.path})
//   //     .then(function(createdFile){
//   //       return User.findOneAndUpdate({email: $rootScope.currentUser.email}, {$push: {files: createdFile} }, {new : true})
//   //     })
//   //     .then(function(){
//   //       retrieveAllFiles()
//   //     })
//   //     .then(null, function (err) {
//   //       throw err;
//   //     });
//   //   }
//   // }
// })