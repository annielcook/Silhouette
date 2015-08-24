var fs = require("fs");
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var availableApps = require('./availableAppList.js')
// var optionalApps = [ 'alfred', 'caffeine', 'cheatsheet', 'chrome-devtools', 'chromecast', 'dropbox', 'firefox', 'flux', 'gimp', 'google-chrome', 'iterm2', 'kindle', 'macvim', 'rdio', 'robomongo',  'skype', 'slack', 'spotify', 'sublime-text', 'virtualbox', 'vlc'];


window.thisApp.factory('ApplicationFactory', function($rootScope){
  return{

    deleteApp: function(app){
      return User.findOneAndUpdate({email: $rootScope.currentUser.email}, {$pull: {applicationPreferences: app} }, {new : true})
      .then(null, function(error){
        console.log(error)
      })
    },

  	uploadFinderInstalled: function(){
  		var finderApps = fs.readdirSync("/Applications")
      var finder = []
      finderApps.forEach(function(app){
        var formatted = app.replace(/\.app$/gi, "").replace(/\s/gi, "-").toLowerCase()
        var indexOfMatch = availableApps.indexOf(formatted);
        if (indexOfMatch != -1) finder.push(availableApps[indexOfMatch]);
      })
  		return finder
  	},
    uploadCaskInstalled: function(){
      // check if brew cask storage directory exists before reading it
      var stat = fs.statSync("/opt/homebrew-cask/Caskroom");
      if ( stat.isDirectory() ) {
        return fs.readdirSync("/opt/homebrew-cask/Caskroom");
      }
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


