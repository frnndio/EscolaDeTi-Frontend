angular.module('app.cartoes')
.controller('meusCartoesController', callMeusCartoesController);

function callMeusCartoesController($scope, toastr, cartoesService, $autenticacao) {

    $scope.meusCartoes = [];

    var getAllCartoes = function(idUsuario) {
        cartoesService.getAllCartoes(idUsuario).then(function(response) {
            $scope.meusCartoes = response.data;
            console.log($scope.meusCartoes);
        });
    }

    getAllCartoes($autenticacao.obter());

    $scope.deleteCartao = function(idCartao) {
        cartoesService.deleteCartao(idCartao).then(function(response) {
            if (response.status == 204) {
                toastr.success('Cartão excluído com sucesso!', 'Sucesso!');
            } else {
                toastr.warning('Ocorreu um erro, tente novamente', 'Atenção!');
            }
            getAllCartoes($autenticacao.obter());
        });
    }

    $scope.goToPath = function(path) {
        cartoesService.goToPath(path);
    }

    $scope.validaBandeiraCartao = function(numeroCartao) {
        var bandeira;
        if (/^5[1-8]/.test(numeroCartao)) {
            bandeira = 'Mastercard';
        } else if (/^4/.test(numeroCartao)) {
            bandeira = 'Visa';
        } else {
            bandeira = '';
        }

        return bandeira;
    }

    $scope.hideCartao = function(numero) {
        return "XXXX.XXXX.XXXX." + numero.toString().substr(12, 15);
    }

}
