!function () {

    'use strict';

    angular
        .module('pesquisa')
        .config(ConfigRoutes)

    ConfigRoutes.$inject = ['$routeProvider'];
    function ConfigRoutes($routeProvider) {

        $routeProvider.when("/pesquisa/pesquisar", {
            templateUrl: 'app_modules/pesquisa/pesquisar/lista.html',
            controller: 'PesquisaListaController'
        });
        
    }
}();