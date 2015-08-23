var mongoose = require('mongoose');
var Package = mongoose.model('Package');
var User = mongoose.model('User');
var Promise = require('bluebird');
var _ = require('lodash');

window.thisApp.factory('PackageFactory', function($rootScope){
  return{
    addPackagePrefs: function(packagename, packagePrefs){
      var packageIndex = packagePrefs.indexOf(packagename);
      if(packageIndex === -1){
        packagePrefs.push(packagename);
      } else {
        packagePrefs.splice(packageIndex, 1);
      }
      return packagePrefs;
    },
    createPackages: function (arrOfArrs){
    	return Promise.all(_.map(arrOfArrs, function(arr) {
    		return Package.create(
    			{'name': arr[0],
    			 'modules': arr[1]}
    		)
        }))
    		.then(function (arrayOfPackageObjs) {
    			return User.findOneAndUpdate({email: $rootScope.currentUser.email}, {$set: {packages: arrayOfPackageObjs}}, {new: true})
          .then(function(user){
            return user;
          })
    		})
    },
    getPackages: function(){
      return User.findOne({email: $rootScope.currentUser.email})
             .populate('packages')
             .then(function(user){
              console.log('getting packages for user in factory:', user);
              return user.packages;
             })
    },
    toggleModuleSelections: function(packageName, moduleName, modulePrefs) {
      var modIndex = modulePrefs[packageName].indexOf(moduleName);
      if (modIndex === -1) {
        modulePrefs[packageName].push(moduleName)
      } else {
        modulePrefs[packageName].splice(modIndex, 1)
      }
      return modulePrefs;
    },
    //update after user selects/unselects pacakges in package manager
    updatePackages: function (modulePrefs){
      //get modulePrefs in format that schema accepts
     return Promise.all( _.map(modulePrefs, function(module, key){
              return Package.create( {'name': key, 'modules': module} )
             }))
             .then(function(arrayOfPackageObjs){
               return User.findOneAndUpdate({email: $rootScope.currentUser.email}, {$set: {packages: arrayOfPackageObjs}}, {new: true})
               // .populate('packages');
             })
    },
    removeModule: function (packageName, module) {
      //on the user there is a package field that looks like 
      //[{name: npm, modules: ['blah']},{name:brew, modules: ['also','blah']}]
      //find user
      //get package id
      //findOneAndUpdate on package

      return User.findOne({email: $rootScope.currentUser.email}).populate('packages')
      .then(function (user) {
        var packageToUpdate = _.filter(user.packages, function (packageObj){
          return (packageObj.name === packageName)
        })
        var newModuleArr = _.filter(packageToUpdate[0]['modules'], function (oneModule){
          return oneModule !== module
        })
        return Package.findByIdAndUpdate(packageToUpdate[0]._id, {$set: {modules: newModuleArr}}, {new:true})
        .then(function (pack) {
          return pack;
        })
        .then(function(){
          return User.findOne({email: $rootScope.currentUser.email}).populate('packages')
        })
      })
    }
  }
})