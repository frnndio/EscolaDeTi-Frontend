angular
    .module('maquinario')
    .controller('anunciosEditarController', callAnuncioEditar);

callAnuncioEditar.$inject = ['$scope', '$routeParams', 'maquinarioService', 'CategoriaService', 'SubcategoriaService', '$autenticacao'];

function callAnuncioEditar($scope, $routeParams, maquinarioService, CategoriaService, SubcategoriaService, $autenticacao) {
    
    $autenticacao.validaAutenticado();

    $scope.tituloPagina = ' EDITE SEU ANÚNCIO';
    $scope.iconPagina = 'icon-pencil-1';
    $scope.idCategoria;
    $scope.idEstado;
    $scope.idCidade;
    $scope.estados;
    $scope.cidades;
    $scope.categorias;
    $scope.subcategorias;

    $scope.typeOfView = 'editar';

    $scope.anuncio;

    var addMaskToTelefone = function(telefone) {
        var newTelefone = telefone;
        if (newTelefone.length == 11) {
            newTelefone = '(' + newTelefone[0] + newTelefone[1] + ')' + ' ' + newTelefone.slice(2, 7) + '-' + newTelefone.slice(7);
        } else {
            newTelefone = '(' + newTelefone[0] + newTelefone[1] + ')' + ' ' + newTelefone.slice(2, 6) + '-' + newTelefone.slice(6);
        }
        $scope.anuncio.telefone =  newTelefone;
    }

    maquinarioService.findAnuncioById($routeParams.id).then(function(response) {
        $scope.anuncio = response.data;
        $scope.idCategoria = response.data.subCategoria.idCategoria;
        $scope.anuncio.idSubCategoria = response.data.subCategoria.id;
        $scope.idEstado = response.data.endereco.cidade.idEstado;
        $scope.idCidade = response.data.endereco.cidade.id;
        $scope.anuncio.ano = response.data.ano.toString();
        addMaskToTelefone($scope.anuncio.telefone.toString());
        if ($scope.idCategoria != null) {
            SubcategoriaService.getAllByCategory($scope.idCategoria).then(function(response) {
                $scope.subcategorias = response.data;
            });
        }
        maquinarioService.getCidadesByEstadoId($scope.idEstado).then(function(response) {
            $scope.cidades = response.data;
        });
        for (var i = 0; i < $scope.anuncio.fotos.length; i++) {
            var imgs = $scope.anuncio.fotos[i];
            maquinarioService.listImagesInEditionFormData(imgs, $scope.anuncio, i, $scope.anuncioMaquinarioForm);
        }
    });

    CategoriaService.getAll().then(function(response) {
        $scope.categorias = response.data;
    });

    $scope.getSubcategorias = function(idCategoria) {
        SubcategoriaService.getAllByCategory(idCategoria).then(function(response) {
            $scope.subcategorias = response.data;
        });
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

    $scope.goToPath = function (path) {
        maquinarioService.goToPath(path);
    }

    $scope.salvar = function (anuncio) {
        maquinarioService.editarAnuncio(anuncio, $scope.idCidade, $scope.anuncioMaquinarioForm, $routeParams.tipo);
    }

}
