angular.module('maquinario')
    .controller('anunciosImpulsionarPagamentoController', callAnunciosImpulsionarPagamentoController);

function callAnunciosImpulsionarPagamentoController($scope, $routeParams, maquinarioService, cartoesService, toastr, $locale, $autenticacao) {
    $autenticacao.validaAutenticado()

    angular.element(document).ready(function () {
        $("#cpfCnpj").mask("000.000.000-00");
        $("#numeroCartao").mask("0000.0000.0000.0000");
    });

    $scope.dadosPagamento = {
        id: 0,
        idPessoa: $autenticacao.obter(),
        numeroCartao: '',
        nomeTitular: '',
        mesValidade: '',
        anoValidade: ''
    };

    cartoesService.getAllCartoes($scope.dadosPagamento.idPessoa).then(function(response) {
        if (response.data.length > 0) {
            $scope.dadosPagamento = response.data[0];
            $scope.dadosPagamento.numeroCartao = addCardNumberMask($scope.dadosPagamento.numeroCartao.toString());
            $scope.dadosPagamento.mesValidade = $scope.dadosPagamento.mesValidade.toString();
            $scope.dadosPagamento.anoValidade = $scope.dadosPagamento.anoValidade.toString();
        }
    });

    $scope.meses = ['1','2','3','4','5','6','7','8','9','10','11','12'];

    $scope.anos = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036', '2037'];

    $scope.goToPath = function(path) {
        maquinarioService.goToPath(path);
    }

    $scope.finalizar = function(dadosPagamento) {

        maquinarioService.impulsionarAnuncio($routeParams.id, {categoriaAnuncio: $routeParams.impulsao}).then(function(response) {
            if (response.status == 200) {
                toastr.success('Anúncio impulsionado com sucesso!', 'Sucesso!');
            } else {
                toastr.warning('Ocorreu um erro, tente novamente', 'Atenção!');
            }
            maquinarioService.goToPathByTipo($routeParams.tipo);
        });

        cartoesService.getAllCartoes(dadosPagamento.idPessoa).then(function(response) {
            var exist = 0;
            response.data.forEach(function(cartao) {
                if (addCardNumberMask(cartao.numeroCartao.toString()) == dadosPagamento.numeroCartao) {
                    exist = 1;
                }
            });
            if (exist == 0) {
                dadosPagamento.numeroCartao = removeCardNumberMask(angular.copy(dadosPagamento.numeroCartao.toString()));
                dadosPagamento.mesValidade = Number(dadosPagamento.mesValidade);
                dadosPagamento.anoValidade = Number(dadosPagamento.anoValidade);
                cartoesService.saveCartao(dadosPagamento).then(function(response) {
                });
            }
        });
    }

    var removeCardNumberMask = function(cardNumber) {
        return Number(cardNumber.replace(/\./g, ''));
    }

    var addCardNumberMask = function(cardNumber) {
        return cardNumber.slice(0, 4) + '.' + cardNumber.slice(4, 8) + '.' + cardNumber.slice(8, 12) + '.' + cardNumber.slice(12, 16);
    }

}
