var mongoose = require('mongoose');
var Package = mongoose.model('Package');
var User = mongoose.model('User');
var Promise = require('bluebird');
var _ = require('lodash');
var fs = Promise.promisifyAll(require("fs"));
var exec = require('child_process').exec;

window.thisApp.factory('InstallationFactory', function($rootScope, PackageFactory, FileManagerFactory, ApplicationFactory){
  return{
    installAllPackages: function(){
     PackageFactory.getPackages()
      .then(function(thePackages) {
        console.log('inside get packages . then')
          console.log('global', global);
        thePackages.forEach(function (pack) {
          var global = "";
          (pack.name === 'npm') ? (global = ' -g') : (global = '');
          pack.modules.forEach(function (mod) {
            var cmd = pack.name + global + ' install ' + mod;
            exec(cmd, function (err, stdout, stderr) {
              if(err) return console.log('Error ', err);
              console.log(mod + ' has been successfully installed!')
            })
          })
        })      
      })
     },
    installAllFiles: function(){
      console.log('installing files!');
      return FileManagerFactory.getAllFiles()
      .then(function(files){
        Promise.all(_.map(files, function(file){
          console.log('installing file with writeFileAsync', file);
          var folderPath = file.path.slice(0, file.path.lastIndexOf('/'));
          console.log('folderpath', folderPath);
          return fs.lstatAsync(folderPath)
          .then(function(lstatObj){
            console.log('lstatObj', lstatObj);
            return fs.writeFileAsync(file.path, file.content);
          }, function(err){
            console.log('error', err);
            return fs.writeFileAsync(process.env["HOME"]+ '/' +file.name , file.content);
          })
        }))
      })
      .then(null, function(err){
        console.error('Error', err);
      })
     },
    installAllApps: function(){
      return ApplicationFactory.retrieveCurrentApps()
      .then(function(apps){
        console.log('installing this app!!!')
        _.each(apps, function(app){
          ApplicationFactory.installApp(app);
        })
      })
      .then(null, function(err){
        console.error('error:', err);
      })
    }
  }
})