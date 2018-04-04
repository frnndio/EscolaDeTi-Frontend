(function () {
    'use strict';

    var dependencies = [
        'app.menu',
        'ngRoute',
        'toastr',
        'ui.bootstrap',
        'ngCookies',
        'anuncios',
        'maquinario',
        'app.categoria',
        'pesquisa',
        'usuario',
        'app.subcategoria',
        'login',
        'avaliacaoAnuncio',
        'ngMessages',
        'base64',
        'app.cartoes'
    ];

    angular
        .module('time02site', dependencies);
})();