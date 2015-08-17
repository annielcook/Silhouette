var mongoose = require('mongoose');

app.controller('LoggedInCtrl', function ($scope, $state, LoggedInFactory) {
  
  $scope.hello = "Hello Anna";

  $scope.uploadFile = LoggedInFactory.uploadFile;

})

app.factory('LoggedInFactory', function(){
  return{
    uploadFile :function(event){
      var file = event.target.files;
      console.log('files', file);
    }
  }
})