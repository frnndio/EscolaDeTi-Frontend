(function () {
    'use strict';

    angular
        .module('app.categoria')
        .controller('CategoriaListaController', CategoriaListaController);

    CategoriaListaController.$inject = ['$scope', '$location', 'CategoriaService', 'toastr'];

    function CategoriaListaController($scope, $location, CategoriaService, toastr) {
        $scope.removeCategory = removeCategory;
        $scope.editCategory = editCategory;
        $scope.newCategory = newCategory;

        function init() {
            CategoriaService.getAll()
                .then(function (response) {
                    if (response.data) {
                        $scope.categoryList = response.data;
                    } else {
                        $scope.categoryList = [];
                        toastr.info('Informa��o!', 'N�o foram encontradas subcategorias');
                    }
                });
        }
        init();

        function removeCategory(id) {
            CategoriaService.remove(id)
                .then(function (data) {
                    console.log('response');
                    console.log(data);
                    console.log('response');
                    if (data.status == 204) {
                        init();
                        toastr.success('Sucesso!', 'Categoria removida com sucesso!');
                    }
                    else {
                        toastr.error('Erro!', 'A Categoria n�o pode ser deletada');
                        console.log(data.message);
                    }
                    $scope.$apply();
                });
        }

        function editCategory(id) {
            if (id.length > 0) {
                $location.path('/categorias/' + id + '/editar')
            }
            else {
                toastr.error('Erro!', 'Identificador n�o encontrado!');
                $scope.$apply();
            }
        }

        function newCategory() {
            $location.path('/categorias/criar')
        }
    }
})();
