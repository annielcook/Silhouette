'use strict'

window.thisApp.directive('previewPanel', function () {
	return {
		restrict: 'E',
		templateUrl: __dirname + '/previewPanel.html',
	}
})