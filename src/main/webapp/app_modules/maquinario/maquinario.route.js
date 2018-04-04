angular
    .module('maquinario')
    .config(function($routeProvider) {

        $routeProvider.when('/anuncios', {
            controller: 'anunciosPublicadosController',
            templateUrl: 'app_modules/maquinario/anunciosPublicados/anunciosPublicados.html'
        });

        $routeProvider.when('/anuncios/aguardando_aprovacao', {
            controller: 'anunciosAguardandoAprovacaoController',
            templateUrl: 'app_modules/maquinario/anunciosAguardandoAprovacao/anunciosAguardandoAprovacao.html'
        });

        $routeProvider.when('/anuncios/expirados', {
            controller: 'anunciosExpiradosController',
            templateUrl: 'app_modules/maquinario/anunciosExpirados/anunciosExpirados.html'
        });

        $routeProvider.when('/anuncios/novo', {
            controller: 'anunciosNovoController',
            templateUrl: 'app_modules/maquinario/anunciosNovoEditar/anunciosNovoEditar.html'
        });

        $routeProvider.when('/anuncios/edit/:id/:tipo', {
            controller: 'anunciosEditarController',
            templateUrl: 'app_modules/maquinario/anunciosNovoEditar/anunciosNovoEditar.html'
        });

        $routeProvider.when('/anuncios/display/:id', {
            controller: 'anunciosDisplayController',
            templateUrl: 'app_modules/maquinario/anunciosDisplay/anunciosDisplay.html'
        });

        $routeProvider.when('/anuncios/impulsionar/:tipo/:id', {
            controller: 'anunciosImpulsionarController',
            templateUrl: 'app_modules/maquinario/anunciosImpulsionar/anunciosImpulsionar.html'
        });

        $routeProvider.when('/anuncios/pagamento/:tipo/:id/:impulsao', {
            controller: 'anunciosImpulsionarPagamentoController',
            templateUrl: 'app_modules/maquinario/anunciosImpulsionarPagamento/anunciosImpulsionarPagamento.html'
        });

    });
