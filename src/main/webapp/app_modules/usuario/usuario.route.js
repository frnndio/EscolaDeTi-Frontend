!function () {

    'use strict';

    angular
        .module('usuario')
        .config(ConfigRoutes)

    ConfigRoutes.$inject = ['$routeProvider'];
    function ConfigRoutes($routeProvider) {

        $routeProvider.when("/usuario/cadastrar", {
            templateUrl: 'app_modules/usuario/cadastrar/cadastrar.html',
            controller: 'CadastrarUsuarioController'
        });

        $routeProvider.when("/dados-pessoais", {
            templateUrl: 'app_modules/usuario/editar/editar.html',
            controller: 'EditarUsuarioController'
        });
    }
}();
