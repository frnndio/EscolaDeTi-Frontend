(function () {
    'use strict';

    angular
        .module('app.subcategoria')
        .controller('SubcategoriaEditarController', SubcategoriaEditarController);

    SubcategoriaEditarController.$inject = ['$scope', '$location', '$routeParams', 'SubcategoriaService', 'CategoriaService', 'toastr', 'navbarInject'];

    function SubcategoriaEditarController($scope, $location, $routeParams, SubcategoriaService, CategoriaService, toastr, navbarInject) {
        $scope.navbar = navbarInject;
        $scope.sendForm = sendForm;
        $scope.returnPage = returnPage;
        $scope.subCategory = {};
        $scope.page = {
            "breadcrumb": "Editar",
            "title": "Editar subcategorias",
            "persistName": "Atualizar"
        };
        $scope.statusList = [
            {"id": 0, "nome": "Inativo"},
            {"id": 1, "nome": "Ativo"}
        ];

        function init() {
            SubcategoriaService.getById($routeParams.id)
                .then(function (response) {
                    if (response.status == 200) {
                        $scope.subCategory.id = response.data.id;
                        $scope.subCategory.name = response.data.nome;
                        $scope.subCategory.categoryTypeId = response.data.idCategoria;
                        $scope.subCategory.description = response.data.descricao;
                        $scope.subCategory.status = response.data.ativo ? 1 : 0;
                    }
                    else {
                        toastr.info('Informação!', 'Não foi encontrado a subcategoria');
                        $location.path('/subcategorias')
                    }
                    $scope.$apply();
                });
            CategoriaService.getAll()
                .then(function (response) {
                    console.log(response.status == 200);
                    if (response) {
                        $scope.categoryList = response.data;
                    }
                    else {
                        $scope.categoryList = [];
                        toastr.info('Informação!', 'Não foi encontrado nenhuma categoria');
                    }
                })
        }

        init();

        function sendForm() {
            if ($scope.formSubCategory.$valid) {
                var params = {
                    "id": $scope.subCategory.id,
                    "nome": $scope.subCategory.name,
                    "idCategoria": $scope.subCategory.categoryTypeId,
                    "descricao": $scope.subCategory.description,
                    "ativo": $scope.subCategory.status
                }
                SubcategoriaService.update(params)
                    .then(function (response) {
                        $location.path('/subcategorias', response);
                        toastr.success('Sucesso!', 'Subcategoria alterada com sucesso!');
                    });
            }
        }

        function returnPage() {
            $location.path('/subcategorias');
            $scope.$apply();
        }
    }
})();
