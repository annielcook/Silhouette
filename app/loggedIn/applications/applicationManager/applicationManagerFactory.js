var fs = require("fs");
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');

window.thisApp.factory('ApplicationManagerFactory', function($rootScope){
  return{
  	uploadCurrentCask: function(){
  		var cask = fs.readdirSync("/opt/homebrew-cask/Caskroom");
  		return User.findOne({email: $rootScope.currentUser.email})
  		.then(function(user){
  			user.applicationPreferences.push.apply(user.applicationPreferences, cask);
  			var appPrefs = _.uniq(user.applicationPreferences);
  			return appPrefs;
  		})
  		.then(function(prefs){
  			return User.findOneAndUpdate({email: $rootScope.currentUser.email}, {applicationPreferences: prefs}, {new : true});
  		})
  		.then(function(user){
  			return user.applicationPreferences;
  		})
  		.then(null, function (err) {
        throw err;
      });		
  	},
  	uploadFinderInstalled: function(){
  		var finderApps = fs.readdirSync("/Applications")
  		return finderApps
  	}
  }
})