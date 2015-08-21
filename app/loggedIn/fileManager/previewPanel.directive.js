'use strict'

app.directive('previewPanel', function () {
	return {
		restrict: 'E',
		templateUrl: __dirname + '/app/loggedIn/fileManager/previewPanel.html',
	}
})