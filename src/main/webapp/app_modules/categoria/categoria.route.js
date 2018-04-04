(function () {
    'use strict';

    angular
        .module('app.categoria')
        .config(stateConfig);

    stateConfig.$inject = ['$routeProvider', '$locationProvider'];

    function stateConfig($routeProvider, $locationProvider) {
        $routeProvider
            .when('/categorias', {
                templateUrl: 'app_modules/categoria/categoria-lista.html',
                controller: 'CategoriaListaController',
            })
            .when('/categorias/criar', {
                templateUrl: 'app_modules/categoria/categoria-manter.html',
                controller: 'CategoriaCriarController',
            })
            .when('/categorias/:id/editar', {
                templateUrl: 'app_modules/categoria/categoria-manter.html',
                controller: 'CategoriaEditarController',
            });
    }
})();
