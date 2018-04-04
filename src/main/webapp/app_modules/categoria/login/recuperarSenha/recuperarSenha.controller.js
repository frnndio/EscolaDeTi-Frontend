(function () {

    'use strict';

    angular
        .module('login')
        .controller('RecuperarSenhaController', RecuperarSenhaController);

    RecuperarSenhaController.$inject = ['$scope', '$autenticacao'];
    function RecuperarSenhaController($scope, $autenticacao) {
        $scope.recuperarSenha = recuperarSenha;

        function recuperarSenha(email) {

            $autenticacao
                .recuperarSenha(email, function (response) {
                    alert(response.message);
                });
        }
    }
})();