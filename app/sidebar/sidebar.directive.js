'use strict'

app.directive('sidebar', function () {
	return {
		restrict: 'E',
		templateUrl: __dirname + '/app/sidebar/sidebar.html'
	}
})