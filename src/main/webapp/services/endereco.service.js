(function () {

    angular.module('time02site')
        .factory("enderecoService", enderecoService)

    enderecoService.$inject = ['$http', 'configuracao']
    function enderecoService($http, configuracao) {
        var urlApi = configuracao.urlApi + '/enderecos'

        function returnSucess(response) {
            /// <summary>No caso da promise retornar um sucesso, esse metodo retorna o resultado do sucesso.</summary>
            /// <param name="response" type="array[]">Um array de objetos com os dados da requisi��o.</param>
            /// <returns type="array[]">Retorna o objeto.</returns>
            return response.data;
        }

        function returnFailure(error) {
            /// <summary>Em caso de falha na promise, esse metodo retorna um alerta de erro.</summary>
            /// <param name="error" type="array[]">Um array de objetos com os dados da requisi��o.</param>
            /// <returns type="Number">Retorna os dados do erro,.</returns>
            alert(error.data);
        }

        function salvarEndereco(params) {
            return $http.post(urlApi, params)
                .then(returnSucess)
                .catch(returnFailure);
        }

        return {
            "salvarEndereco": salvarEndereco
        }
    }
})()
