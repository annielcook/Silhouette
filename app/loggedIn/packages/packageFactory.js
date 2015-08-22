var mongoose = require('mongoose')
var Package = mongoose.model('Package');
var User = mongoose.model('User');
var Promise = require('bluebird');

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
    			 'path': arr[1],
    			 'modules': arr[2]}
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
    addPackageSelections: function(packagename, packageSelections){
        var packageIndex = packageSelections.indexOf(packagename);
        if(packageIndex === -1){
          packageSelections.push(packagename);
        } else {
          packageSelections.splice(packageIndex, 1);
        }
        return packageSelections;
    }

  }
})