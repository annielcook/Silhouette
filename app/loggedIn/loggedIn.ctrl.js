var mongoose = require('mongoose');
// var databaseURI = 'mongodb://silhouette:silhouette1506@ds031893.mongolab.com:31893/silhouette';
// var db = mongoose.connect(databaseURI).connection;
require(__dirname + '/db/models/file');
require(__dirname + '/db/models/user');
var fs = require('fs');
var File = mongoose.model('File');
var User = mongoose.model('User');

app.controller('LoggedInCtrl', function ($scope, $state, LoggedInFactory) {
  
  $scope.hello = "Hello Anna";

  $scope.uploadFile = LoggedInFactory.uploadFile;

})


app.factory('LoggedInFactory', function(){
  return{
    uploadFile :function(event){
      var file = event.target.files[0];
      console.log('files', file);
      var data = fs.readFileSync(file.path, 'utf8');
      File.create({'name': file.name, 'content': data, 'path': file.path})
      .then(function(createdFile){
        // console.log('file', file);
        console.log('createdFile:', createdFile);
        return User.findOneAndUpdate({email: $rootScope.currentUser}, {$push: {files: createdFile} }, {new : true})
      })
      .then(null, next);
    }
  }
})