angular.module('avaliacaoAnuncio')
    .controller('anunciosAguardandoAvaliacaoController', callAnunciosAguardandoAvaliacaoController);

function callAnunciosAguardandoAvaliacaoController($scope, maquinarioService, SubcategoriaService, CategoriaService) {

    /*$scope.anunciosAguardandoAvalicao = maquinarioService.findAllAnunciosAguardandoAprovacao();*/

    maquinarioService.getAllAnunciosAguardandoAprovacaoAdmin().then(function(response) {
        $scope.anunciosAguardandoAvalicao = response.data.content;
        var j = 0;
        var x = 0;
        for (var i = 0; i < $scope.anunciosAguardandoAvalicao.length; i ++) {
            SubcategoriaService.getById($scope.anunciosAguardandoAvalicao[i].subCategoriaId).then(function(response) {
                $scope.anunciosAguardandoAvalicao[j].nomeSubcategoria = response.data.nome;
                j = j + 1;
                CategoriaService.getById(response.data.idCategoria).then(function(response) {
                    $scope.anunciosAguardandoAvalicao[x].nomeCategoria = response.data.nome;
                    x = x + 1;
                }); 
                
            });
        }
    });

    $scope.getAnuncioDate = function(date) {
        return maquinarioService.getAnuncioDate(date);
    }
    
    $scope.goToPath = function(path) {
        maquinarioService.goToPath(path);
    }
}