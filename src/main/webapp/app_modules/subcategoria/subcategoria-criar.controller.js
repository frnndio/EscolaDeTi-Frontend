(function () {
    'use strict';

    angular
        .module('app.subcategoria')
        .controller('SubcategoriaCriarController', SubcategoriaCriarController);

    SubcategoriaCriarController.$inject = ['$scope', '$location', 'CategoriaService', 'SubcategoriaService', 'toastr', 'navbarInject'];

    function SubcategoriaCriarController($scope, $location, CategoriaService, SubcategoriaService, toastr, navbarInject) {
        $scope.navbar = navbarInject;
        $scope.sendForm = sendForm;
        $scope.returnPage = returnPage;
        $scope.subCategory = {};
        $scope.page = {
            "breadcrumb": "Criar",
            "title": "Criar subcategoria",
            "persistName": "Cadastrar",
            "isCreating": true
        };
        $scope.statusList = [
            { "id": 0, "nome": "Inativo" },
            { "id": 1, "nome": "Ativo" }
        ];

        function init() {
            $scope.subCategory.status = 1;
            CategoriaService.getAll()
                .then(function (response) {
                    $scope.categoryList = response.data;
                })
        }
        init();

        function sendForm() {
            if ($scope.formSubCategory.$valid) {
                var params = {
                    "nome": $scope.subCategory.name,
                    "idCategoria": $scope.subCategory.categoryTypeId,
                    "descricao": $scope.subCategory.description,
                    "ativo": $scope.subCategory.status
                };
                SubcategoriaService.add(params)
                    .then(function (response) {
                        $location.path('/subcategorias');
                        toastr.success('Sucesso!', 'Subcategoria salva com sucesso!');
                    });
            }
        }

        function returnPage() {
            $location.path('/subcategorias')
            $scope.$apply();
        }
    }
})();
