app.controller('HomeCtrl', function ($scope, $state, HomeFactory) {
  $scope.hello = "hello Anna";
  $scope.uploadFile = function(event){
    var files = event.target.files;
    console.log('files', files);
  };

})

app.factory('HomeFactory', function($http){
  return{
    uploadFileX: function(file){
      console.log('here');
      console.log('file', file);
    }
  }
})