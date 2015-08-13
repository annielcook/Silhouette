app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, AuthService, $state, UserFactory) {

    $scope.sendSignup = function (userInfo) {
        AuthService.signup(userInfo)
        .then(function(signedInUser){
            $state.go('home');
        }).catch(function() {
            console.log('signup error occured')
        })
    };

});