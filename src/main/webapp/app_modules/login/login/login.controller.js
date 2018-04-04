(function () {

    'use strict';

    angular
        .module('login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$location', '$autenticacao', 'toastr', '$rootScope', '$window'];
    function LoginController($scope, $location, $autenticacao, toastr, $rootScope, $window) {
        $scope.logar = logar;

        function logar(email, senha) {
            $autenticacao.logar(email, senha)
                .then(() => {
                    var result = $window.localStorage.getItem('usuarioLogado');
                    if (result) {
                        $location.path('/anuncios')
                        toastr.success('Sucesso!', 'Login realizado com sucesso!');

                        $rootScope.isLogged = true;
                        $location.path('/')
                    }
                    else {
                        toastr.error('Login inválido!', 'Login e/ou senha(s) inválido(s)!');
                        $rootScope.isLogged = false;
                    }
                });
        }
    }

})();
