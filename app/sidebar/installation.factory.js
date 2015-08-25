var mongoose = require('mongoose');
var Package = mongoose.model('Package');
var User = mongoose.model('User');
var Promise = require('bluebird');
var _ = require('lodash');
var fs = Promise.promisifyAll(require("fs"));
var exec = require('child_process').exec;

window.thisApp.factory('InstallationFactory', function($rootScope, PackageFactory, FileManagerFactory, ApplicationFactory){
  return{
    preInstallCheck: function () {

      var checkInstalls = [
        '/Applications/Xcode.app',
        '/usr/local/Cellar',
        '/usr/local/Cellar/brew-cask',
        '/usr/local/bin/node',
      ]

      var commands = [
        'xcode-select --install', 
        'ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"',
        'brew install caskroom/brew/brew-cask',
        'export PATH="/usr/local/bin:$PATH"',
        'brew install node']

      var needToInstall = [];
      //check brew

      return Promise.all(_.map(checkInstalls, function (installPath, index) {
        return fs.lstatAsync(installPath)
        .then(function (lstatObj) {
          console.log('already exists: ', lstatObj)
          return lstatObj;
        }, function (err) {
          console.log('error: ', err)
          console.log('pushing to need to install: ', commands[index])
          needToInstall.push(commands[index]);
          (index === 3) ? needToInstall.push(commands[4]) : console.log('pushed two commands');
        })
      }))
      .then(function (){
        return needToInstall;
      })

    },
    installAllPackages: function(){
     PackageFactory.getPackages()
      .then(function(thePackages) {
        thePackages.forEach(function (pack) {
          var global = "";
          (pack.name === 'npm') ? (global = ' -g') : (global = '');
          pack.modules.forEach(function (mod) {
            var cmd = pack.name + global + ' install ' + mod;
            exec(cmd, function (err, stdout, stderr) {
              if(err) return console.log('Error ', err);
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