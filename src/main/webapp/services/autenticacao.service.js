(function () {

    'use strict';

    angular
        .module('login')
        .factory('$autenticacao', AutenticacaoService);

    AutenticacaoService.$inject = ['$http', '$rootScope', '$usuario', '$window', 'configuracao', '$location'];
    function AutenticacaoService($http, $rootScope, $usuario, $window, configuracao, $location) {
        return {
            "logar": logar,
            "recuperarSenha": recuperarSenha,
            "logado": logado,
            "deslogar": deslogar,
            "obter": obter,
            "validaAutenticado": validaAutenticado,
            "getPessoaLogada": getPessoaLogada,
            "loadPessoaLogada": loadPessoaLogada
        }

        function success(response) {
            var data = new Date();
            data.setMinutes(data.getMinutes() + 20);

            if (response.data != null) {
                $window.localStorage.setItem('usuarioLogado', JSON.stringify(response.data));
            }
        }

        function error(response) {
            return response;
        }

        function logar(email, senha, callback) {
            $window.localStorage.removeItem('usuarioLogado');
            var params = {
                "login": email,
                "senha": senha
            }
            return $http.post(configuracao.urlApi + "/login/logar", params)
                .then(success)
                .catch(error);
        }

        function recuperarSenha(email) {
          var data = {
            email: email
          }

          return $http.post(configuracao.urlApi + '/login/recuperar', data)
        }

        function logado() {
            var username = $window.localStorage.getItem("usuarioLogado");
            if (username) {
                return true
            }
            else {
                return false
            }
        }

        function loadPessoaLogada() {
          this.getPessoaLogada().then(response => $rootScope.pessoaLogada = response)
        }

        function getPessoaLogada() {
          return $http.get(configuracao.urlApi + "/pessoas/" + this.obter())
            .then(response => response.data)
            .catch(error)
        }

        function deslogar() {
            $window.localStorage.removeItem("usuarioLogado")
        }

        function validaAutenticado() {
            if (!this.logado()) {
              $location.path('/login');
            }
          }

        function obter() {
            var usuario = $window.localStorage.getItem("usuarioLogado");
            return JSON.parse(usuario).idPessoa;
        }
    }
})();
