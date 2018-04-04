(function () {
    'use strict';

    angular
        .module('login')
        .factory('LoginService', LoginService);

    function LoginService() {
        var urlApi = "http://back.time02escoladeti.com/";
        return {
            "logar": logar,
            "recuperarSenha": recuperarSenha
        }


        function returnSucess(response) {
            return response.data;
        }

        function returnFailure(error) {
            return error;
        }

        function logar(email, senha) {
            return $http.post(urlApi + 'logar', {
                "email": email,
                "senha": senha
            })
                .then(returnSucess)
                .catch(returnFailure);
        }    

        function recuperarSenha(email) {
            return $http.get(urlApi + 'recuperar/' + email)
                .then(returnSucess)
                .catch(returnFailure);
        }    

    }

})();