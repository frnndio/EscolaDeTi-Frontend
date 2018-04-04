(function () {
    'use strict';

    angular
        .module('app.subcategoria')
        .controller('SubcategoriaListaController', SubcategoriaListaController);

    SubcategoriaListaController.$inject = ['$scope', '$location', 'SubcategoriaService', 'CategoriaService', 'toastr', 'navbarInject'];

    function SubcategoriaListaController($scope, $location, SubcategoriaService, CategoriaService, toastr, navbarInject) {
        $scope.navbar = navbarInject;
        $scope.removeSubCategory = removeSubCategory;
        $scope.editSubCategory = editSubCategory;
        $scope.newSubCategory = newSubCategory;

        function init() {
            SubcategoriaService.getAll()
                .then(function (response) {
                    if (response.data) {
                        $scope.subCategoryList = response.data;

                        CategoriaService.getAll().then(function(response) {
                            var categorias = response.data;
                
                            for (var i = 0; i < $scope.subCategoryList.length; i++) {
                                var categoria = categorias.find(function(categoria) {
                                    if (categoria.id == $scope.subCategoryList[i].idCategoria) return categoria;
                                });
                
                                $scope.subCategoryList[i].nomeCategoria = categoria.nome;
                            }
                        });
                    }
                    else {
                        $scope.subCategoryList = [];
                        toastr.info('Informa��o!', 'N�o foi encontrado subcategorias');
                    }
                });
        }
        init();

        function removeSubCategory(id) {
            SubcategoriaService.remove(id)
                .then(function (response) {
                    console.log(response);
                    if (response.status == 204) {
                        init();
                        toastr.success('Sucesso!', 'Subcategoria removida com sucesso!');
                    }
                    else {
                        toastr.error('Erro!', 'A subcategoria n�o pode ser deletada');
                        console.log(response.message);
                    }
                });
        }

        function editSubCategory(id) {
            if (id.length > 0) {
                $location.path('/subcategorias/' + id + "/editar");
            }
            else {
                toastr.error('Erro!', 'Identificador n�o encontrado!');
            }
        }

        function newSubCategory() {
            $location.path('/subcategorias/criar');
        }
    }
})();
