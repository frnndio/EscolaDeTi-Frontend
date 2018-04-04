angular.module('avaliacaoAnuncio')
    .controller('displayAnunciosAguardandoAprovacaoController', callDisplayAnunciosAguardandoAprovacaoController);

function callDisplayAnunciosAguardandoAprovacaoController($scope, $routeParams, toastr, maquinarioService, CategoriaService) {

    /*$scope.anuncio = maquinarioService.findAnuncioById($routeParams.id, 'aguardando');*/

    $scope.anuncio;
    $scope.cidade;
    $scope.categoria;
    $scope.estado;

    maquinarioService.findAnuncioById($routeParams.id).then(function(response) {
        $scope.anuncio = response.data;
        
        CategoriaService.getById($scope.anuncio.subCategoria.idCategoria).then(function(response) {
            $scope.categoria = response.data.nome;
        });

        maquinarioService.getEnderecoById($scope.anuncio.endereco.id).then(function(response) {
            $scope.cidade = response.data.cidade.nome;

            maquinarioService.getEstadoById(response.data.cidade.idEstado).then(function(response) {
                $scope.estado = response.data.nome;
            });
        });
    });

    $scope.getAnuncioDate = function(date) {
        return maquinarioService.getAnuncioDate(date);
    }

    $scope.getAnuncioTime = function(date) {
        return maquinarioService.getAnuncioTime(date);
    }

    $scope.getCidade = function(anuncio) {
        maquinarioService.getCidadeById(anuncio.idEndereco).then(function(response) {
            $scope.cidade = reponse.data;
        });
    }

    $scope.goToPath = function(path) {
        maquinarioService.goToPath(path);
    }

    $scope.aprovarAnuncio = function(anuncio) {
        maquinarioService.aprovarAnuncio(anuncio.id).then(function(response) {
            if (response.status == 200) {
                toastr.success('Anúncio aprovado com sucesso!', 'Sucesso!');
            } else {
                toastr.warning('Ocorreu um erro, tente novamente', 'Atenção!');
            }
            maquinarioService.goToPath('/avaliacao_anuncios');
        });
    }

    $scope.reprovarAnuncio = function(anuncio) {
        maquinarioService.reprovarAnuncio(anuncio.id).then(function(response) {
            if (response.status == 200) {
                toastr.success('Anúncio reprovado com sucesso!', 'Sucesso!');
            } else {
                toastr.warning('Ocorreu um erro, tente novamente', 'Atenção!');
            }
            maquinarioService.goToPath('/avaliacao_anuncios');
        });
    }
}