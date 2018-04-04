(function () {
    'use strict';

    angular
        .module('app.categoria')
        .factory('CategoriaService', CategoriaService);

    CategoriaService.$inject = ['$http', 'configuracao'];

    function CategoriaService($http, configuracao) {
        var urlApi = configuracao.urlApi + "/categorias/";
        var databaseCounter = 1;
        var database = [
            {
                "id": 1,
                "name": "Agrícola",
                "machineType": 0,
                "description": "Categoria para todas subcategorias de maquinário agrícula.",
                "status": 1
            },
            {
                "id": 2,
                "name": "Civil",
                "machineType": 1,
                "description": "Categoria para todas subcategorias de maquinário civil.",
                "status": 1
            }
        ];

        return {
            getAll: getAll,
            getById: getById,
            add: add,
            update: update,
            remove: remove
        }

        function returnSucess(response) {
            /// <summary>No caso da promise retornar um sucesso, esse metodo retorna o resultado do sucesso.</summary>
            /// <param name="response" type="array[]">Um array de objetos com os dados da requisição.</param>
            /// <returns type="array[]">Retorna o objeto.</returns>
            return response;
        }

        function returnFailure(error) {
            /// <summary>Em caso de falha na promise, esse metodo retorna um alerta de erro.</summary>
            /// <param name="error" type="array[]">Um array de objetos com os dados da requisição.</param>
            /// <returns type="Number">Retorna os dados do erro.</returns>
            return []
        }

        function getAll() {
            return $http.get(urlApi)
                .then(returnSucess)
                .catch(returnFailure);
        }

        function getById(id) {
            return $http.get(urlApi + id)
                .then(returnSucess)
                .catch(returnFailure);
        }

        function add(params) {
            return $http.post(urlApi, params)
                .then(returnSucess)
                .catch(returnFailure);
        }

        function update(params) {
            return $http.put(urlApi + params.id, params)
                .then(returnSucess)
                .catch(returnFailure);
        }

        function remove(id) {
            return $http.delete(urlApi + id)
                .then(returnSucess)
                .catch(returnFailure);
        }
    }
})();
