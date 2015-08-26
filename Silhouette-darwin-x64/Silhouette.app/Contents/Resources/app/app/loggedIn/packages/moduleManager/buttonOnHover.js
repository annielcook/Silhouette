window.thisApp.directive('buttonOnHover', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			element.on('mouseenter', function () {
				$scope.button = true;
			})
			element.on('mouseleave', function () {
				$scope.button = false;
			})
		}
	}
})