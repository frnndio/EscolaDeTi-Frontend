angular.module('maquinario')
    .controller('anunciosDisplayController', callAnunciosDisplayController);

function callAnunciosDisplayController($scope, $routeParams, maquinarioService, CategoriaService) {
    $scope.anuncio;
    $scope.cidade;
    $scope.categoria;
    $scope.estado;
    $scope.telefone;

    var addPhoneMask = function(telefone) {
        
        var newTelefone = telefone.toString();
        
        if (newTelefone.length == 11) {
            newTelefone = '(' + newTelefone[0] + newTelefone[1] + ')' + ' ' + newTelefone.slice(2, 7) + '-' + newTelefone.slice(7);
        } else {
            newTelefone = '(' + newTelefone[0] + newTelefone[1] + ')' + ' ' + newTelefone.slice(2, 6) + '-' + newTelefone.slice(6);
        }

        $scope.telefone =  newTelefone;
    }

    maquinarioService.findAnuncioById($routeParams.id).then(function(response) {
        $scope.anuncio = response.data;

        addPhoneMask($scope.anuncio.telefone);
        
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

}
