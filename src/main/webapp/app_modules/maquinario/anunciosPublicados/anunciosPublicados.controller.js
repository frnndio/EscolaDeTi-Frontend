angular.module('maquinario')
    .controller('anunciosPublicadosController', callAnunciosPublicadosController);

function callAnunciosPublicadosController($scope, toastr, maquinarioService, $autenticacao) {
    $autenticacao.validaAutenticado()

    $scope.id;

    $scope.publicadosActive = true;
    $scope.aguardandoActive = false;
    $scope.expiradosActive = false;

    $scope.selecionarTodosAnuncios = function(checked) {
        var checked = document.querySelector('#checkAllPublicados').checked;
        maquinarioService.selecionarTodosAnuncios('publicados', checked);
    }

    $scope.existeAnuncio = function() {
        if($scope.anunciosPublicados.length == 0) {
            return false;
        } else {
            return true;
        }
    }

    $scope.goToPath = function(path) {
        maquinarioService.goToPath(path);
    }

    $scope.anuncios = [];

    var init = function() {
        maquinarioService.getAllAnunciosAprovados($autenticacao.obter()).then(function(response) {
            $scope.anuncios = response.data.content;
            var j = 0;
            var x = 0;
            for (var i = 0; i < $scope.anuncios.length; i ++) {
                maquinarioService.setImgImpulsao($scope.anuncios[i], $scope.anuncios[i].categoriaAnuncio);
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
    }

  init();

  $scope.salvarId = function(id) {
      $scope.id = id
  }

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

  $scope.excluirAnuncioById = function(id) {
      maquinarioService.excluirAnuncio(id).then(function(response) {
          if (response.status == 204) {
              toastr.success('Anúncio excluído com sucesso!', 'Sucesso!');
          } else {
              toastr.warning('Ocorreu um erro, tente novamente', 'Atenção!');
          }
          init();
      });
  }
}
