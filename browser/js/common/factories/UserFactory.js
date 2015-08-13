app.factory('UserFactory', function ($http, $state) {
		var userApiPath = '/api/users';
		return {
			signup: function(userInfo) {
				return $http.post(userApiPath, userInfo)
					.then(function (user) {
						$state.go('home');
						return user.data;
					})
			}
		}


})