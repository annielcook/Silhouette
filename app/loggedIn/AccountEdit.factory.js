app.factory('AccountEditFactory', function($rootScope){
  return{
     saveUserChanges:function(){
        console.log('current User', $rootScope.currentUser);
      }
    }
})