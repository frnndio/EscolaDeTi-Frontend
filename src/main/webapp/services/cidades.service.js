(function() {

  angular.module('time02site')
    .factory("$cidades", CidadeService)

  CidadeService.$inject = ['$http', 'configuracao']
  function CidadeService($http, configuracao) {
    var urlApi = configuracao.urlApi + '/cidades'

    function callbackSuccess(response) {
      return response.data
    }

    function getCidadesByEstado(idEstado) {
      return $http.get(urlApi + '/estado/' + idEstado)
        .then(callbackSuccess)
    }

    return {
      getCidadesByEstado: getCidadesByEstado
    }
  }
})()
