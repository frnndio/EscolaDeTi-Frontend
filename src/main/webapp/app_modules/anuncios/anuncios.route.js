(function(){

    'use strict';

    angular 
        .module("anuncios")
        .config(ConfigRoute);

    ConfigRoute.$inject = ['$routeProvider'];
    function ConfigRoute($routeProvider){
        $routeProvider
            .when('/anuncios', {
                templateUrl: 'app_modules/anuncios/lista/lista.html',
                controller: "ListaAnunciosController"
            });
    }

})();