angular
    .module('avaliacaoAnuncio')
    .config(function($routeProvider) {

        $routeProvider.when('/avaliacao_anuncios', {
            controller: 'anunciosAguardandoAvaliacaoController',
            templateUrl: 'app_modules/avaliarAnuncios/anunciosAguardandoAvaliacao/anunciosAguardandoAvaliacao.html'
        });

        $routeProvider.when('/avaliacao_anuncios_display/:id', {
            controller: 'displayAnunciosAguardandoAprovacaoController',
            templateUrl: 'app_modules/avaliarAnuncios/displayAnunciosAguardandoAprovacao/displayAnunciosAguardandoAprovacao.html'
        });

    });