(function () {
    'use strict';

    angular
        .module('app.subcategoria')
        .factory('SubcategoriaService', SubcategoriaService);

    SubcategoriaService.$inject = ['$http', 'configuracao'];

    function SubcategoriaService($http, configuracao) {
        var urlApi = configuracao.urlApi + "/subcategorias/";
        var databaseCounter = 1;
        var database = [
            {
                "id": 0,
                "name": "Canavieira",
                "categoryTypeId": 1,
                "description": 'Categoria canavieira',
                "img": 'assets/img/categoria/colheitadeira.png',
                "status": 1
            },
            {
                "id": 1,
                "name": 'Colheita',
                "categoryTypeId": 1,
                "description": 'Categoria colheitadera',
                "img": 'assets/img/categoria/escavadeira.png',
                "status": 1
            },
            {
                "id": 2,
                "name": 'Fenação',
                "categoryTypeId": 1,
                "description": 'Categoria fenação',
                "img": 'assets/img/categoria/trator.png',
                "status": 1
            },
            {
                "id": 3,
                "name": 'Irrigação',
                "categoryTypeId": 1,
                "description": 'Categoria irrigação',
                "img": 'assets/img/categoria/plantadeira.gif',
                "status": 1
            },
            {
                "id": 4,
                "name": 'Plantio',
                "categoryTypeId": 1,
                "description": 'Categoria plantio',
                "img": 'assets/img/categoria/pulverizador.png',
                "status": 1
            },
            {
                "id": 5,
                "name": 'Pós Plantio',
                "categoryTypeId": 1,
                "description": 'Categoria pós plantio',
                "img": 'assets/img/categoria/tr.jpg',
                "status": 1
            }
        ];

        return {
            getAll: getAll,
            getAllByCategory: getAllByCategory,
            getById: getById,
            add: add,
            update: update,
            remove: remove,
            getAllByCategory: getAllByCategory
        }

        function returnSucess(response) {
            /// <summary>No caso da promise retornar um sucesso, esse metodo retorna o resultado do sucesso.</summary>
            /// <param name="response" type="array[]">Um array de objetos com os dados da requisi��o.</param>
            /// <returns type="array[]">Retorna o objeto.</returns>
            return response;
        }

        function returnFailure(error) {
            /// <summary>Em caso de falha na promise, esse metodo retorna um alerta de erro.</summary>
            /// <param name="error" type="array[]">Um array de objetos com os dados da requisi��o.</param>
            /// <returns type="Number">Retorna os dados do erro,.</returns>
            return error;
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

        /*function getAllByCategory(id) {
            return $http.get(urlApi + "/categoria/" + id)
            .then(returnSucess)
            .catch(returnFailure);
        }*/

        function getAllByCategory(idCategoria) {
            return $http.get(urlApi + 'categoria/' + idCategoria)
            .then(returnSucess)
            .catch(returnFailure);
        }
    }
})();
