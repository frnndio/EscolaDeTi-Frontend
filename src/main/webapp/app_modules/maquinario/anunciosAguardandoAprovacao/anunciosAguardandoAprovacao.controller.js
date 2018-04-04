angular.module('maquinario')
    .controller('anunciosAguardandoAprovacaoController', callAnunciosAguardandoAprovacaoController);

function callAnunciosAguardandoAprovacaoController($scope, maquinarioService, $autenticacao) {
  $autenticacao.validaAutenticado()

    $scope.aguardandoActive = true;
    $scope.publicadosActive = false;
    $scope.expiradosActive = false;

    $scope.anuncios = [];
    $scope.number;

    maquinarioService.getAllAnunciosAguardandoAprovacao($autenticacao.obter()).then(function(response) {
        $scope.anuncios = response.data.content;
        var j = 0;
        var x = 0;
        for (var i = 0; i < $scope.anuncios.length; i ++) {
            maquinarioService.getEnderecoById($scope.anuncios[i].idEndereco).then(function(response) {
                $scope.anuncios[j].nomeCidade = response.data.cidade.nome;
                j = j + 1;

                maquinarioService.getEstadoById(response.data.cidade.idEstado).then(function(response) {
                    $scope.anuncios[x].siglaEstado = response.data.sigla;
                    x = x + 1;
                });
            });
        }
    });

    $scope.existeAnuncio = function() {
        if($scope.anuncios.length == 0) {
            return false;
        } else {
            return true;
        }
    }

    $scope.getAnuncioDate = function(date) {
        return maquinarioService.getAnuncioDate(date);
    }

    $scope.getAnuncioTime = function(date) {
        return maquinarioService.getAnuncioTime(date);
    }

    $scope.showCidade = function(anuncio) {
        maquinarioService.getCidadeById(anuncio.idEndereco).then(function(response) {
            anuncio.cidade = response.data.nome;
        });
    }

    $scope.goToPath = function(path) {
        maquinarioService.goToPath(path);
    }
}
