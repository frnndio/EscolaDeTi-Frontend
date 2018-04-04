angular.module('maquinario')
    .controller('anunciosImpulsionarController', callAnunciosImpulsionarController);

function callAnunciosImpulsionarController($scope, $routeParams, maquinarioService, $autenticacao) {
  $autenticacao.validaAutenticado()

    var tipoImpulsaoSelecionada = 'BRONZE';

    $scope.tipoImpulsao = {
        bronze: true,
        prata: false,
        ouro: false,
        diamante: false
    };

    $scope.setTipoImpulsao = function (tipo) {
        for (var propriedade in $scope.tipoImpulsao) {
            if (propriedade == tipo.toLowerCase()) {
                $scope.tipoImpulsao[propriedade] = true;
                continue;
            }
            $scope.tipoImpulsao[propriedade] = false;
        }

        tipoImpulsaoSelecionada = tipo;
    }

    $scope.impulsionar = function() {
        maquinarioService.goToPath('/anuncios/pagamento/' + $routeParams.tipo + '/'+ $routeParams.id + '/' + tipoImpulsaoSelecionada);
    }

    $scope.recusarImpulsao = function() {
        maquinarioService.goToPathByTipo($routeParams.tipo);
    }

    $scope.goToPath = function(path) {
        maquinarioService.goToPath(path);
    }

}
