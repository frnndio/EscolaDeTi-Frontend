(function () {

    'use strict';

    angular
        .module('pesquisa')
        .controller("PesquisaListaController", PesquisaListaController)

    PesquisaListaController.$inject = ['$scope', '$rootScope', 'maquinarioService', 'SubcategoriaService', '$routeParams', 'CategoriaService', '$estados', '$cidades'];
    function PesquisaListaController($scope, $rootScope, maquinarioService, SubcategoriaService, $routeParams, CategoriaService, $estados, $cidades) {
      $scope.pesquisa = {};
      $scope.anuncios = [];
      $scope.estados = []
      $scope.cidades = [];
      $scope.categorias = [];
      $scope.carregarSubCategorias = carregarSubCategorias
      $scope.subCategorias = [];
      $scope.page = 1;
      $scope.pages = []
      $scope.goToPath = goToPath
      $scope.setPage = setPage
      $scope.isPage = isPage
      $scope.pesquisar = pesquisar
      $scope.loadCidades = loadCidades
      $scope.carregando = true

      $scope.teste = "testado"

      function pesquisar() {
        $scope.carregando = true
        let paramsBusca = []
        if ($scope.pesquisa.titulo) {
          paramsBusca.push("descricao:" + $scope.pesquisa.titulo)
        }
        if ($scope.pesquisa.categoria) {
          paramsBusca.push("idCategoria:" + $scope.pesquisa.categoria)
        }
        if ($scope.pesquisa.subcategoria) {
          paramsBusca.push("idSubCategoria:" + $scope.pesquisa.subcategoria)
        }
        if ($scope.pesquisa.precoMin) {
          paramsBusca.push("preco>" + $scope.pesquisa.precoMin)
        }
        if ($scope.pesquisa.precoMax) {
          paramsBusca.push("preco<" + $scope.pesquisa.precoMax)
        }
        if ($scope.pesquisa.estado) {
          paramsBusca.push("idEstado:" + $scope.pesquisa.estado)
        }
        if ($scope.pesquisa.cidade) {
          paramsBusca.push("idCidade:" + $scope.pesquisa.cidade)
        }

        let stringBusca = paramsBusca.join(',')
        stringBusca += "&page=" + $scope.page

        callSearch(stringBusca)
      }

      function isPage(page) {
        return $scope.page === page
      }

      function setPage(page) {
        $scope.page = page
        pesquisar()
      }

      function carregarSubCategorias(idCategoria) {
        SubcategoriaService.getAllByCategory(idCategoria)
          .then(response => {
            $scope.subCategorias = response.data
          })
      }

      function callSearch(term) {
        maquinarioService.search(term)
          .then(response => {
            $scope.anuncios = response.data
            respondidoAnuncios()
          })
      }

      function respondidoAnuncios() {
        if($scope.anuncios.content) {
          for (var i = 0; i < $scope.anuncios.content.length; i++) {
            const item = $scope.anuncios.content[i];
            let date = new Date(item.dataCadastro)
            let stringDate = date.getDay();
            stringDate += "/"
            stringDate += date.getMonth()
            stringDate += "/"
            stringDate += date.getYear()

            item.dateFormated = stringDate

            CategoriaService.getById(item.subCategoria.idCategoria)
              .then(response => {
                item.subCategoria.categoria = response.data
              })

            if(!!item.endereco) {
              $estados.getById(item.endereco.cidade.idEstado)
                .then(response => {
                  item.endereco.cidade.estado = response
                })
            }
          }
        }

        $scope.pages = []
        for(var i = 1; i <= $scope.anuncios.totalPages; i++) {
          $scope.pages.push(i)
        }
        $scope.carregando = false
      }

      function goToPath(path) {
          maquinarioService.goToPath(path);
      }

      function loadCategorias() {
        CategoriaService
            .getAll()
            .then(response => {
              $scope.categorias = response.data
            })
      }

      function loadEstados() {
        $estados.getAll()
          .then(response => {
            $scope.estados = response
          })
      }

      function loadCidades(idEstado) {
        pesquisar()
        $cidades.getCidadesByEstado(idEstado)
          .then(response => {
            $scope.cidades = response
          })
      }

      loadCategorias()
      loadEstados()
      callSearch("")
    }

})();
