(function () {
    'use strict';

    angular
        .module('app.menu')
        .config(stateConfig);

    stateConfig.$inject = ['$routeProvider', '$locationProvider'];

    function stateConfig($routeProvider, $locationProvider) {
        $routeProvider
            .when('', {
                templateUrl: 'app_modules/menu/shell.html',
                controller: 'MenuController'
            })
    }
})();
