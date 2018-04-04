(function () {
    'use strict';

    angular
        .module('maquinario')
        .controller('anunciosNovoController', callAnunciosNovoController);

    callAnunciosNovoController.$inject = ['$scope', 'maquinarioService', 'CategoriaService', 'SubcategoriaService', 'toastr', '$autenticacao'];

    function callAnunciosNovoController($scope, maquinarioService, CategoriaService, SubcategoriaService, toastr, $autenticacao) {

        $autenticacao.validaAutenticado();

        $scope.tituloPagina = ' CRIE SEU ANÚNCIO';
        $scope.iconPagina = 'icon-picture';
        $scope.idCategoria;
        $scope.idEstado;
        $scope.idCidade;
        $scope.estados;
        $scope.cidades;
        $scope.categorias;
        $scope.subcategorias;

        $scope.typeOfView = 'criar';

        $scope.anuncio = {
            ano: '',
            dataCadastro: '',
            descricao: '',
            idEndereco: '',
            idPessoa: $autenticacao.obter(),
            idSubCategoria: '',
            categoriaAnuncio: '',
            marca: '',
            negociavel: false,
            telefone: '',
            titulo: '',
            valor: '',
            fotos: []
        };

        CategoriaService.getAll().then(function(response) {
            $scope.categorias = response.data;
        });

        $scope.getSubcategorias = function(idCategoria) {
            if (idCategoria != null) {
                SubcategoriaService.getAllByCategory(idCategoria).then(function(response) {
                    $scope.subcategorias = response.data;
                });
            }
        }

        maquinarioService.getAllEstados().then(function(response) {
            $scope.estados = response.data;
        });

        $scope.getCidadesByEstadoId = function(idEstado) {
            maquinarioService.getCidadesByEstadoId(idEstado).then(function(response) {
                $scope.cidades = response.data;
            });
        }

        $scope.marcas = maquinarioService.findAllMarcas();

        $scope.anos = maquinarioService.findAllAnos();

        $scope.getMarcas = function (idCategoria) {
            var categoriaSelecionada;

            categoriaSelecionada = $scope.categorias.filter(function(categoria) {
                if (categoria.id == idCategoria) return categoria;
            });

            return maquinarioService.getMarcas(categoriaSelecionada[0].nome);

        }

        $scope.setEndereco = function(idCidade) {
            var endereco = {
                bairro: null,
                complemento: null,
                idCep: null,
                idCidade: idCidade,
                numero: null,
                rua: null
            }
            maquinarioService.addEndereco(endereco).then(function(response) {
                $scope.anuncio.idEndereco = response.data.idGerado;
            });
        }

        $scope.goToPath = function (path) {
            maquinarioService.goToPath(path);
        }

        $scope.salvar = function (anuncio) {
            var fotos = anuncio.fotos;
            var copyAnuncio = angular.copy(anuncio);
            copyAnuncio.valor = Number(copyAnuncio.valor.replace('.','').replace(',', '.'))
            copyAnuncio.fotos = fotos;
            console.log('copyAnuncio');
            console.log(copyAnuncio);
            maquinarioService.insertAnuncio(copyAnuncio, '/anuncios/impulsionar/aguardando/');
        }

        $("#preco").priceFormat({
            prefix: '',
            centsSeparator: ',',
            thousandsSeparator: '.'
        });

        $(document).ready(initializeComponents);

    }

    var phoneOptions = {
        onKeyPress: function (val, e, field, options) {
            field.mask(phoneBehavior.apply({}, arguments), options);
        }
    };

    function phoneBehavior(val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    }

    function initializeComponents() {
        $("[data-mask='phone']").mask(phoneBehavior, phoneOptions);
    }

})();
