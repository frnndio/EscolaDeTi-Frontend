(function () {

    'use strict';

    angular
        .module('login')
        .controller('RecuperarSenhaController', RecuperarSenhaController);

    RecuperarSenhaController.$inject = ['$scope', '$autenticacao', 'toastr', '$location'];
    function RecuperarSenhaController($scope, $autenticacao, toastr, $location) {
        $scope.recuperarSenha = recuperarSenha;

        function recuperarSenha(email) {

            if(!email || !email.length)
                alert("Informe um e-mail válido!");

            $autenticacao
                .recuperarSenha(email)
                .then(() => {
                  toastr.success('Um email foi enviado com sua nova senha, pode demorar alguns minutos, verifique sua caixa de spam!', 'Sucesso')
                  $location.path('/login')
                })
                .catch((res) => {
                  if (res.status === 404) {
                    alert(res.data.message)
                  } else {
                    alert('Ocorreu um erro')
                    console.error(res)
                  }
                })
        }
    }
})();
