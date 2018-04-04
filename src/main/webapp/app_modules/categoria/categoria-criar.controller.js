(function () {
    'use strict';

    angular
        .module('app.categoria')
        .controller('CategoriaCriarController', CategoriaCriarController);

    CategoriaCriarController.$inject = ['$scope', '$location', 'CategoriaService', 'toastr'];

    function CategoriaCriarController($scope, $location, CategoriaService, toastr) {
        $scope.sendForm = sendForm;
        $scope.returnPage = returnPage;
        $scope.category = {};
        $scope.page = {
            "breadcrumb": "Criar",
            "title": "Criar categorias",
            "persistName": "Cadastrar",
            "isCreating": true
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
            $scope.category.status = 1;
            $scope.category.machineType = 0;
        }
        init();

        function sendForm() {
            if ($scope.formCategory.$valid) {
                var params = {
                    "nome": $scope.category.name,
                    "descricao": $scope.category.description,
                    "ativo": $scope.category.status == 1 ? true : false
                }
                CategoriaService.add(params)
                    .then(function (response) {
                        $location.path('/categorias')
                        toastr.success('Sucesso!', 'Categoria salva com sucesso!');
                    });
            }
        }

        function returnPage() {
            $location.path('/categorias')
        }
    }
})();
