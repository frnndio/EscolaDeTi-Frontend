(function () {
    'use strict';

    angular
        .module('app.categoria')
        .controller('CategoriaEditarController', CategoriaEditarController);

    CategoriaEditarController.$inject = ['$scope', '$location', '$routeParams', 'CategoriaService', 'toastr'];

    function CategoriaEditarController($scope, $location, $routeParams, CategoriaService, toastr) {
        $scope.sendForm = sendForm;
        $scope.returnPage = returnPage;
        $scope.category = {};
        $scope.page = {
            "breadcrumb": "Editar",
            "title": "Editar categorias",
            "persistName": "Atualizar"
        };
        $scope.statusList = [
            { "id": 0, "nome": "Inativo" },
            { "id": 1, "nome": "Ativo" }
        ];
        $scope.typeList = [
            { "id": 0, "nome": "Agrícola" },
            { "id": 1, "nome": "Civil" }
        ];

        function init() {
            CategoriaService.getById($routeParams.id)
                .then(function (response) {
                    if (response.data) {
                        $scope.category.id = response.data.id;
                        $scope.category.name = response.data.nome;
                        $scope.category.machineType = 1;
                        $scope.category.description = response.data.descricao;
                        $scope.category.status = response.data.ativo ? 1 : 0;
                    }
                    else {
                        toastr.info('Informação!', 'Não foi encontrado a subcategoria');
                        $location.path('/categorias');
                    }
                    $scope.$apply();
                });
        }
        init();

        function sendForm() {
            if ($scope.formCategory.$valid) {
                var params = {
                    "id": $scope.category.id,
                    "nome": $scope.category.name,
                    "descricao": $scope.category.description,
                    "ativo": $scope.category.status
                }
                CategoriaService.update(params)
                    .then(function (response) {
                        console.log(response);
                        if (response.status == 200) {
                            $location.path('/categorias', response);
                            toastr.success('Sucesso!', 'Categoria alterada com sucesso!');
                        }
                    });
            }
        }

        function returnPage() {
            $location.path('/categorias');
        }
    }
})();
