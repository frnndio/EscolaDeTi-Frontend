(function() {

  angular.module('time02site')
    .factory('$estados', EstadoService)

  EstadoService.$inject = ['$http', 'configuracao']
  function EstadoService($http, configuracao) {
    const urlApi = configuracao.urlApi + '/estados'

    function callbackSuccess(response) {
      return response.data
    }

    function getAll() {
      return $http.get(urlApi)
        .then(callbackSuccess)
    }

    function getById(idEstado) {
        return $http.get(urlApi + '/' + idEstado).then(callbackSuccess)
    }

    return {
      getAll: getAll,
      getById: getById
    }
  }

})()
