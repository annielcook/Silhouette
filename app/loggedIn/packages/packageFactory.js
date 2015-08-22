var mongoose = require('mongoose')
var Package = mongoose.model('Package');
var User = mongoose.model('User');
var Promise = require('bluebird');
var _ = require('lodash')

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
    	return Promise.all(arrOfArrs.map(function(arr) {
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
    //objects, one npm, one brew
    //toggle the modules associated with each
    //RETURN OBJ looks like {npm: ["skjdf", "sldf"],brew: ["lkjdf"]}
    toggleModuleSelections: function(packageName, moduleName, modulePrefs) {
      console.log('module prefs: ', modulePrefs)
      var modIndex = modulePrefs[packageName].indexOf(moduleName);
      console.log('module pref before toggle: ', modulePrefs)

      if (modIndex === -1) {
        modulePrefs[packageName].push(moduleName)
      } else {
        modulePrefs[packageName].splice(modIndex, 1)
      }
      console.log('module pref after toggle: ', modulePrefs)
      return modulePrefs;
    },
    //update after user selects/unselects pacakges in package manager
    updatePackages: function (modulePrefs){
      return User.findOneAndUpdate({email: $rootScope.currentUser.email}, {$set: {packages: modulePrefs}}, {new: true})
    }

  }
})