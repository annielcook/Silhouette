var mongoose = require('mongoose')
var Package = mongoose.model('Package');
var User = mongoose.model('User');
var Promise = require('bluebird');

window.thisApp.factory('ApplicationSelectorFactory', function($rootScope){
	return {
		addAppPrefs: function(appName, appPrefs){
      var appIndex = appPrefs.indexOf(appName);
      if(appIndex === -1){
        appPrefs.push(appName);
      } else {
        appPrefs.splice(appIndex, 1);
      }
      return appPrefs;
    },
    addAppsToUser: function(prefs){
    	return User.findOneAndUpdate({email: $rootScope.currentUser.email}, {applicationPreferences: prefs}, {new : true})
    	.then(function(user){
  			return user.applicationPreferences;
  		})
  		.then(null, function (err) {
        throw err;
      });
    }
	}
})