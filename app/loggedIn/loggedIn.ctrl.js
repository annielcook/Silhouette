var mongoose = require('mongoose');
// var databaseURI = 'mongodb://silhouette:silhouette1506@ds031893.mongolab.com:31893/silhouette';
// var db = mongoose.connect(databaseURI).connection;
require(__dirname + '/db/models/file');
require(__dirname + '/db/models/user');
var fs = require('fs');
var File = mongoose.model('File');
var User = mongoose.model('User');

app.controller('LoggedInCtrl', function ($scope, $state, FileManagerFactory, AccountEditFactory) {

  $scope.uploadFile = FileManagerFactory.uploadFile;
  $scope.saveAccountChanges = AccountEditFactory.saveUserChanges;
  // $scope.user = currentUser
})


app.factory('FileManagerFactory', function($rootScope){
  return{
    uploadFile :function(event){
      var file = event.target.files[0];
      var data = fs.readFileSync(file.path, 'utf8');
      File.create({'name': file.name, 'content': data, 'path': file.path})
      .then(function(createdFile){
        return User.findOneAndUpdate({email: $rootScope.currentUser.email}, {$push: {files: createdFile} }, {new : true})
      })
      .then(null, function (err) {
        throw err;
      });
    }
  }
})