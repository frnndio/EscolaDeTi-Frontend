(function () {

    'use strict';

    angular
        .module('login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$autenticacao'];
    function LoginController($scope, $autenticacao) {
        $scope.logar = logar;

        function logar(email, senha) {
            $autenticacao.logar(email, senha, function (response) {

                alert(response.message);

            });
        }
    }

})();