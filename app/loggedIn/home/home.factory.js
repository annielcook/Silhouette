var mongoose = require('mongoose');
var User = mongoose.model('User');

window.thisApp.factory('HomeFactory', function($rootScope){
  return {
  	populateUser: function () {
  		return User.findById($rootScope.currentUser._id).populate('packages files applications')
	  	.then(function (user) {
	  		return user;
	  	})
	  }
  }
})