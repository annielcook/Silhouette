var fs = require("fs");
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var availableApps = require('./availableAppList.js')
var optionalApps = [ 'alfred', 'caffeine', 'cheatsheet', 'chrome-devtools', 'chromecast', 'dropbox', 'firefox', 'flux', 'gimp', 'google-chrome', 'iterm2', 'kindle', 'macvim', 'rdio', 'robomongo',  'skype', 'slack', 'spotify', 'sublime-text', 'virtualbox', 'vlc'];


window.thisApp.factory('ApplicationFactory', function($rootScope){
  return{
  	updateCurrentCask: function(newApps){
  		return User.findOne({email: $rootScope.currentUser.email})
  		.then(function(user){
  			user.applicationPreferences.push.apply(user.applicationPreferences, newApps);
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
    deleteApp: function(app){
      return User.findOneAndUpdate({email: $rootScope.currentUser.email}, {$pull: {applicationPreferences: app} }, {new : true})
      .then(null, function(error){
        console.log(error)
      })
    },
    
    availableApps: function(finderApps){
      var availableAndHas = [];
      finderApps.forEach(function(app){
        var indexOfMatch = availableApps.indexOf(app);
        if (indexOfMatch != -1) availableAndHas.push(availableApps[indexOfMatch]);
      })
      return availableAndHas
    },
    // // display options that have not been chosen
    // optionals: function(listOfApps){
    //   var optionalToDisplay = [];
    //   console.log("optionalApps: ", optionalApps)
    //   optionalApps.forEach(function(app){
    //     var indexOfMatch = listOfApps.indexOf(app);
    //     console.log("app: ", app, " index: ", indexOfMatch)
    //     if (indexOfMatch === -1) optionalToDisplay.push(app);
    //   })
    //   return optionalToDisplay;
    // },
  	uploadFinderInstalled: function(){
  		var finderApps = fs.readdirSync("/Applications")
      var out = []
      finderApps.forEach(function(app){
        var formatted = app.replace(/\.app$/gi, "").replace(/\s/gi, "-").toLowerCase()
        out.push(formatted)
      })
  		return out
  	},
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
    },
    retrieveCurrentApps: function(){
      return User.findOne({email: $rootScope.currentUser.email})
      .then(function(user){
        return user.applicationPreferences
      })
      .then(null, function (err) {
        throw err;
      });
    }
  }
})


