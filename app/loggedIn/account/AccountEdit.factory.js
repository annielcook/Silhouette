var mongoose = require('mongoose');
//require(__dirname + '/db/models/user');
var User = mongoose.model('User');

window.thisApp.factory('AccountEditFactory', function($rootScope){
  return{
     saveUserChanges:function(){
        return User.findByIdAndUpdate($rootScope.currentUser.id, {$set: editeduser}, {new:true})
        .then(function(user){
          console.log('updated user in files:', user.filePreferences);
        })
        .then(null, function(err){
          throw err;
        });
      }
    }
})