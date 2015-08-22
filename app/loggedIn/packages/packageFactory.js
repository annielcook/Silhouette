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
    		})
    },
    getPackages: function(){
      return User.findOne({email: $rootScope.currentUser.email})
             .populate('packages')
             .then(function(user){
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
    }

  }
})