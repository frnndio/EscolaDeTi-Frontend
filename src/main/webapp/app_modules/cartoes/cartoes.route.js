angular
.module('app.cartoes')
.config(function($routeProvider) {

    $routeProvider.when('/cartoes/meus-cartoes', {
        controller: 'meusCartoesController',
        templateUrl: 'app_modules/cartoes/meusCartoes/meusCartoes.html'
    });

    $routeProvider.when('/cartoes/novo', {
        controller: 'novoCartaoController',
        templateUrl: 'app_modules/cartoes/novoCartao/novoCartao.html'
    });

});