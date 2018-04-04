angular.module('app.cartoes')
.factory('cartoesService', callCartoesService);

function callCartoesService($location, toastr, $http) {

    var service = {};

    var urlApi = "http://back.time02escoladeti.com/";

    function returnSucess(response) {
        return response;
    }

    function returnFailure(error) {
        return error;
    }

    service.getAllCartoes = function(idUsuario) {
        return $http.get(urlApi + 'cartoes?idPessoa=' + idUsuario)
            .then(returnSucess)
            .catch(returnFailure);
    }

    service.saveCartao = function(novoCartao) {
        return $http.post(urlApi + 'cartoes', novoCartao)
            .then(returnSucess)
            .catch(returnFailure);
    }

    service.deleteCartao = function(idCartao) {
        return $http.delete(urlApi + 'cartoes/' + idCartao)
            .then(returnSucess)
            .catch(returnFailure);
    }

    service.getCartaoById = function(idCartao) {
        return $http.get(urlApi + 'cartoes/' + idCartao)
        .then(returnSucess)
        .catch(returnFailure);
    }

    service.goToPath = function(path) {
        $location.path(path);
    }

    return service;
}
