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
   }
})