var mongoose = require('mongoose');
//require(__dirname + '/db/models/user');
var User = mongoose.model('User');

window.thisApp.factory('AccountEditFactory', function($rootScope){
  return{
     saveUserChanges:function(){
        console.log('current User', $rootScope.currentUser);
        User.findByIdAndUpdate($rootScope.currentUser.id, {$set: $rootScope.currentUser}, {new:true})
        .then(null, function(err){
          throw err;
        });
      }
    }
})