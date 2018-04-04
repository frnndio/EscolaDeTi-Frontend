(function () {

    'use strict';

    angular
        .module('login')
        .config(ConfigRoutes);

    ConfigRoutes.$inject = ['$routeProvider'];
    function ConfigRoutes($routeProvider) {
        $routeProvider.when("/login", {
            templateUrl: 'app_modules/login/login/login.html',
            controller: 'LoginController'
        });

        $routeProvider.when("/login/recuperar", {
            templateUrl: 'app_modules/login/recuperarSenha/recuperarSenha.html',
            controller: 'RecuperarSenhaController'
        });
    }

})();