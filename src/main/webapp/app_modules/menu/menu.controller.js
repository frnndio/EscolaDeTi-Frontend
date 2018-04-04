(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['$rootScope', '$scope', '$window', '$location', 'toastr', '$autenticacao'];

    function MenuController($rootScope, $scope, $window, $location, toastr, $autenticacao) {
        $scope.info = {};
        $scope.sair = sair;
        $scope.editarPerfil = editarPerfil;
        $scope.goToFazerAnuncio = goToFazerAnuncio;
        var logado = $autenticacao.logado();

        if (logado) {
          setLogado()
        }

        function setLogado() {
          $scope.isLogged = true;
          $autenticacao.getPessoaLogada()
            .then(response => {
              $rootScope.pessoaLogada = response
            })
        }

        $rootScope.$on("$routeChangeStart", function (args) {
            var logado = $autenticacao.logado();
            if (logado == true) {
                setLogado()
            }
        });

        function init() {
            $scope.info.year = new Date().getFullYear();
        }

        init();

        function sair() {
            $autenticacao.deslogar();
            $location.path('/anuncios');
            $window.location.reload();
        }

        function editarPerfil() {
            var resultado = $autenticacao.obter();
            var usuario = JSON.parse(resultado);
            $location.path('/usuario/' + usuario.id)
        }

        function goToFazerAnuncio() {
            $location.path('/anuncios/novo');
        }
    }
})();
