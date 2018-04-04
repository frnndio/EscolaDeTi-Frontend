(function () {

    'use strict';

    angular.module('usuario')
        .factory('$usuario', UsuariosService);

    UsuariosService.$inject = ['$http', 'configuracao']
    function UsuariosService($http, configuracao) {
        return {
            "adicionarUsuario": adicionarUsuario,
            "adicionarPessoaFisica": adicionarPessoaFisica,
            "adicionarPessoaJuridica": adicionarPessoaJuridica,
            "getAllFisica": getAllFisica,
            "getFisicaById": getFisicaById,
            "getAllJuridica": getAllJuridica,
            "getJuridicaById": getJuridicaById,
            "getById": getById,
            "salvarPessoa": salvarPessoa,
            "salvarPessoaJuridica": salvarPessoaJuridica,
            "salvarPessoaFisica": salvarPessoaFisica,
            "buscarEndereco": buscarEndereco,
            "alterarSenha": alterarSenha
        }

        function alterarSenha(email, senhaAtual, senhaNova) {
          const data = {
            login: email,
            senhaAtual: senhaAtual,
            senhaNova: senhaNova
          }

          return $http.put(configuracao.urlApi + "/usuarios", data)
        }

        function salvarPessoaJuridica(pessoa) {
          return salvarAbstract(pessoa, "juridica")
        }

        function salvarAbstract(pessoa, tipo) {
          return $http
            .put(configuracao.urlApi + "/pessoas/" + tipo +"/" + pessoa.id, pessoa)
            .then(successCallback)
        }

        function salvarPessoaFisica(pessoa) {
          return salvarAbstract(pessoa, "fisica");
        }

        function getById(idUsuario) {
          return $http.get(configuracao.urlApi + "/pessoas/" + idUsuario.toString())
            .then(successCallback)
        }

        function successCallback(response) {
            return response.data;
        }

        function catchCallback(error) {
            return []
        }

        function getAllFisica(callback) {
            return callback(angular.copy(pessoasFisicas));
        }

        function getFisicaById(id, callback) {
            return callback(getAllFisica(function (response) {
                return response.filter(function (user) {
                    return user.id === id
                })
            }));
        }

        function getAllJuridica(callback) {
            return callback(angular.copy(pessoasJuridicas));
        }

        function getJuridicaById(id, callback) {
            return callback(getAllJuridica(function (response) {
                return response.filter(function (user) {
                    return user.id === id
                })
            }));
        }
        function adicionarUsuario(usuario, callback) {
            return $http.post(configuracao.urlApi + "/usuarios", usuario)
                .then(successCallback)
                .catch(catchCallback);
        }

        function adicionarPessoaFisica(pessoa, callback) {
            return $http.post(configuracao.urlApi + "/pessoas/fisica", pessoa)
                .then(successCallback)
                .catch(catchCallback);
        }

        function adicionarPessoaJuridica(pessoa, callback) {
            return $http.post(configuracao.urlApi + "/pessoas/juridica", pessoa)
                .then(successCallback)
                .catch(catchCallback);
        }

        function salvarPessoa(pessoa) {
            return $http.put(configuracao.urlApi + "/pessoas", pessoa)
                .then(successCallback)
                .catch(catchCallback);
        }

        function buscarEndereco(cep) {
            var url = "https://viacep.com.br/ws/" + cep + "/json/";
            return $http({
                url: url,
                method: "GET",
                dataType: 'json'
            });
        }
    }

    function getUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

})();
