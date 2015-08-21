var mongoose = require('mongoose')
var Package = mongoose.model('Package');
var User = mongoose.model('User');

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
    	arrOfArrs.forEach(function(arr) {
    		Package.create(
    			{'name': arr[0],
    			    			'path': arr[1],
    			    			'modules': arr[2]}
    		)
    		.then(function (packageObj) {
    			return User.findOneAndUpdate({email: $rootScope.currentUser.email}, {$push: {packages: packageObj}}, {new: true})
    		})
    		.then(function (user) {
    			console.log('THIS IS THE USER: ', user)
    		})
    		.then(null, function(err){
    			throw err;
    		})
    	})
    }

  }
})