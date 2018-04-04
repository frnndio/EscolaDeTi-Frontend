(function () {
    'use strict';

    angular
        .module('app.subcategoria')
        .config(stateConfig);

    stateConfig.$inject = ['$routeProvider', '$locationProvider'];

    function stateConfig($routeProvider, $locationProvider) {
        $routeProvider
            .when('/subcategorias', {
                templateUrl: 'app_modules/subcategoria/subcategoria-lista.html',
                controller: 'SubcategoriaListaController',
                resolve: {
                    "navbarInject": function ($route) {
                        return "app_modules/menu/admin-navbar.html";
                    }
                }
            })
            .when('/subcategorias/criar', {
                templateUrl: 'app_modules/subcategoria/subcategoria-manter.html',
                controller: 'SubcategoriaCriarController',
                resolve: {
                    "navbarInject": function ($route) {
                        return "app_modules/menu/admin-navbar.html";
                    }
                }
            })
            .when('/subcategorias/:id/editar', {
                templateUrl: 'app_modules/subcategoria/subcategoria-manter.html',
                controller: 'SubcategoriaEditarController',
                resolve: {
                    "navbarInject": function ($route) {
                        return "app_modules/menu/admin-navbar.html";
                    }
                }
            });
    }
})();
