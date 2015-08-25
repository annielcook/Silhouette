var fs = require("fs");
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var App = mongoose.model('App');
var Promise = require('bluebird');
var exec = require('child_process').exec;
var availableApps = require('./appList.js');





window.thisApp.factory('ApplicationFactory', function($rootScope){
  return{

  	uploadFinderInstalled: function(){

      return availableApps
      .then(function(appList){
        console.log("availableApps in factory: ", appList)
        var finderApps = fs.readdirSync("/Applications")
          var finder = []
          finderApps.forEach(function(app){
            var formatted = app.replace(/\.app$/gi, "").replace(/\s/gi, "-").toLowerCase()
            var indexOfMatch = appList.indexOf(formatted);
            if (indexOfMatch != -1) finder.push(appList[indexOfMatch]);
          })
          return finder
      })
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

    addAppsToUser: function(prefs, dontWant){
      console.log('calling add apps to user')
      console.log('prefs', prefs);
      console.log('dont want in factory: ', dontWant)
      /////////////

      return Promise.all(_.map(prefs, function(app){
        return App.create(
          { 'name': app,
            'tracking': true,
            'date': new Date()}
        )
      }))
      .then(function(arrayOfAppObjs){
        return User.findOneAndUpdate({email: $rootScope.currentUser.email}, {applications: arrayOfAppObjs}, {new: true}).populate('applications')
      })
      .then(null, function (err) {
        console.log('err:', err);
        throw err;
      });
    },

    retrieveCurrentApps: function(){
      return User.findOne({email: $rootScope.currentUser.email})
      .populate('applications')
      .then(function(user){
        return user.applications
      })
      .then(null, function (err) {
        throw err;
      });
    },

    deleteApp: function(app){
      return User.findOne({email: $rootScope.currentUser.email})
      .populate('applications')
      .then(function (user){
        var appToDelete = _.filter(user.applications, function (appObj){
          return (appObj.name === app.name)
        })
        return appToDelete[0].id
      })
      .then(function (appId){
        console.log("app id in .then: ", appId)
        return App.findById(appId)
        .remove()
        .then(function (){
          return User.findOneAndUpdate({email: $rootScope.currentUser.email}, {$pull: {applications: appId} }, {new : true})//.populate('applications')
        })
      })    
      .then(null, function(error){
        console.log(error)
      })
    },

    installApp: function(app){
      var terminalCommand = "brew cask install " + app;
      exec(terminalCommand, function (err, stdout, stderr) {
        if(err) return console.log('Error ', err);
        return console.log(app + ' has been successfully installed!')
      })
    }
  }
})


