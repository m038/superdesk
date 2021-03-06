define([
    'require'
], function(require) {
    'use strict';

    ConfigController.$inject = ['$scope'];
    function ConfigController($scope) {
        $scope.configuration = _.clone($scope.widget.configuration);

        $scope.saveConfig = function() {
            $scope.widget.configuration = $scope.configuration;
            $scope.save();
            $scope.$close();
        };
    }

    /**
     * sdWidget give appropriate template to data assgined to it
     *
     * Usage:
     * <div sd-widget data-widget="widget"></div>
     *
     * Params:
     * @scope {Object} widget
     */
    return ['$modal', function($modal) {
        return {
            templateUrl: require.toUrl('./views/widget.html'),
            restrict: 'A',
            replace: true,
            transclude: true,
            scope: {widget: '=', save: '&'},
            link: function(scope, element, attrs) {
                scope.openConfiguration = function () {
                    $modal.open({
                        templateUrl: require.toUrl('./views/configuration.html'),
                        controller: ConfigController,
                        scope: scope
                    });
                    /*
                     * If other type of modal is opened, close it
                     */
                    $(document).on('shown.bs.modal', '.modal', function () {
                        $(this).modal('hide');
                    });
                };
            }
        };
    }];
});
