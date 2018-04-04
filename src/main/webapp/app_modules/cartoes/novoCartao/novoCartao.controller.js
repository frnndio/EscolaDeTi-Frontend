angular.module('app.cartoes')
.controller('novoCartaoController', callNovoCartaoController);

function callNovoCartaoController($scope, toastr, cartoesService, $http, $autenticacao) {

    $autenticacao.validaAutenticado();

    $scope.cartaoCredito = {
        numeroCartao: '',
        nomeTitular: '',
        mesValidade: '',
        anoValidade: '',
        bandeira: '',
        idPessoa: $autenticacao.obter()
    };

    $('#numeroCartao').mask('0000.0000.0000.0000');

    $scope.meses = ['1','2','3','4','5','6','7','8','9','10','11','12'];

    $scope.anos = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036', '2037'];

    $scope.goToPath = function(path) {
        cartoesService.goToPath(path);
    }

    $scope.salvarCartao = function(novoCartao) {
        novoCartao.numeroCartao = Number(removeCardNumberMask(novoCartao.numeroCartao.toString()));
        console.log(novoCartao.numeroCartao);
        novoCartao.mesValidade = Number(novoCartao.mesValidade);
        novoCartao.anoValidade = Number(novoCartao.anoValidade);

        cartoesService.saveCartao(novoCartao).then(function(response) {
            if (response.status == 200) {
                console.log(response);
                toastr.success('Cartão cadastrado com sucesso!', 'Sucesso!');
            } else {
                toastr.warning('Ocorreu um erro, tente novamente', 'Atenção!');
            }
            cartoesService.goToPath('/cartoes/meus-cartoes');
        }); 
    }   

    var removeCardNumberMask = function(cardNumber) {
        return cardNumber.replace(/\./g, '');
    }
}
