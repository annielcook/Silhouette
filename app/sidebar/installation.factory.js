var mongoose = require('mongoose');
var Package = mongoose.model('Package');
var User = mongoose.model('User');
var Promise = require('bluebird');
var _ = require('lodash');
var fs = Promise.promisifyAll(require("fs"));
var exec = require('child_process').exec;

window.thisApp.factory('InstallationFactory', function($rootScope, PackageFactory, FileManagerFactory){
  return{
    installAllPackages: function(){
      PackageFactory.getPackages()
      .then(function(thePackages) {
        thePackages.forEach(function (pack) {
          pack.modules.forEach(function (mod) {
            var cmd = pack.name + ' install ' + mod;
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
      FileManagerFactory.getAllFiles()
      .then(function(files){
        Promise.all(_.map(files, function(file){
          console.log('installing file with writeFileAsync', file);
          return fs.writeFileAsync(file.path, file.content)      
        }))
      })
      .then(null, function(err){
        console.error('Error', err);
      })
     }
  }
})