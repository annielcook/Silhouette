var mongoose = require('mongoose');

app.controller('HomeCtrl', function ($scope, $state, HomeFactory) {
  
  $scope.hello = "Hello Anna";

  $scope.uploadFile = HomeFactory.uploadFile;

})

app.factory('HomeFactory', function($http){
  return{
    uploadFile :function(event){
      var file = event.target.files;
      console.log('files', file);
    }
  }
})