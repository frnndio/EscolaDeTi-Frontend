!function () {

    'use strict';

    angular
        .module('usuario')
        .controller("EditarUsuarioController", EditarUsuarioController);

    const pattern = /[^0-9]/g

    EditarUsuarioController.$inject = ['$scope', '$usuario', '$routeParams', 'toastr', '$location', '$autenticacao', '$rootScope'];
    function EditarUsuarioController($scope, $usuario, $routeParams, toastr, $location, $autenticacao, $rootScope) {
      $scope.usuario = {}
      $scope.isPessoaFisica = () => 'cpf' in $scope.usuario
      $scope.isPessoaJuridica = () => !$scope.isPessoaFisica()
      $scope.goToPath = (route) => $location.path(route)
      $scope.salvar = () => {
        if ($scope.isPessoaFisica()) {
          debugger
          return validarSenhasFisica(salvarPessoaFisica)
        }

        return validarSenhasJuridica(salvarPessoaJuridica)
      }

      function validarSenhasFisica(callback) {
        const senhaValida = validarSenhasAbstract("senhaAtualFisica", "senhaFisica", "confirmacaoSenhaFisica", callback)
        if (!senhaValida) {
          alert("As senhas não conferem")
        }
        return senhaValida
      }

      function validarSenhasJuridica(callback) {
        const senhaValida = validarSenhasAbstract("senhaAtualJuridica", "senhaJuridica", "confirmacaoSenhaJuridica", callback)
        if (!senhaValida) {
          alert("As senhas não conferem")
        }
        return senhaValida
      }

      function validarSenhasAbstract(fieldPassAtual, fieldNewPass, fieldNewPassConfirm, callback) {
        if ($scope.usuario[fieldPassAtual]) {
          const senhaValida = $scope.usuario[fieldNewPass]
            && $scope.usuario[fieldNewPassConfirm]
            && $scope.usuario[fieldNewPass] === $scope.usuario[fieldNewPassConfirm]

            if (senhaValida) {
              $usuario.alterarSenha($scope.usuario.email, $scope.usuario[fieldPassAtual], $scope.usuario[fieldNewPass])
                .then(response => {
                  toastr.success("Senha alterada com sucesso!", "Sucesso")
                  callback()
                  cleanFields(fieldPassAtual, fieldNewPass, fieldNewPassConfirm)
                })
                .catch(response => {
                  let message = "Ocorreu um erro ao alterar a senha do usuário."
                  if (response.status === 404) {
                    message += "\r\n" + response.data.message
                  }
                  alert(message)
                  console.error(response);
                })
            }

            return senhaValida;
        }

        callback()
        return true
      }

      function cleanFields(fieldPassAtual, fieldNewPass, fieldNewPassConfirm) {
        $scope.usuario[fieldPassAtual] = ""
        $scope.usuario[fieldNewPass] = ""
        $scope.usuario[fieldNewPassConfirm] = ""
      }

      function salvarPessoaFisica() {
        const pessoa = angular.copy($scope.usuario)
        const splited = pessoa.dataNascimento.split('/');

        pessoa.dataNascimento = new Date(splited[2], splited[1] - 1, splited[0]);
        pessoa.cpf = pessoa.cpf.toString().replace(pattern, '');
        pessoa.cpf = parseInt(pessoa.cpf)

        formatPessoa(pessoa)

        $usuario.salvarPessoaFisica(pessoa)
          .then(successCallback)
      }

      function salvarPessoaJuridica() {
        const pessoa = angular.copy($scope.usuario)

        pessoa.cnpj = pessoa.cnpj.toString().replace(pattern, '');
        pessoa.cnpj = parseInt(pessoa.cnpj)

        formatPessoa(pessoa)

        $usuario.salvarPessoaJuridica(pessoa)
          .then(successCallback)
      }

      function successCallback(response) {
        toastr.success('Dados cadastrais salvo com sucesso', 'Salvo!');
        $autenticacao.loadPessoaLogada()
      }

      function formatPessoa(pessoa) {
        pessoa.telefone = pessoa.telefone.toString().replace(pattern, '');
        if (pessoa.celular) {
            pessoa.celular = pessoa.celular.toString().replace(pattern, '');
        }
        if (pessoa.cep) {
          pessoa.cep = pessoa.cep.toString().replace(pattern, '');
        }

        pessoa.telefone = parseInt(pessoa.telefone)
        pessoa.celular = parseInt(pessoa.celular)
        pessoa.cep = parseInt(pessoa.cep)
      }

      angular.element(document).ready(initComponents)

      $usuario.getById($autenticacao.obter())
        .then(response => {
          $scope.usuario = response
          if ($scope.isPessoaFisica()) {
            $scope.usuario.dataNascimento = formatDataNascimento($scope.usuario.dataNascimento)
          }
        })
    }

    function formatDataNascimento(data) {
      const splitedData = data.split('-')
      const year = parseInt(splitedData[0])
      const month = parseInt(splitedData[1])
      const day = parseInt(splitedData[2])

      return day + "/" + month + "/" + year;
    }

    function initComponents() {
      $("[data-mask='cpf']").mask("000.000.000-00");
      $("[data-mask='cnpj']").mask("00.000.000/0000-00");
      $("[data-mask='data']").mask("00/00/0000");
      $("[data-mask='cep']").mask("00000-000");
      $("[data-mask='phone']").mask(phoneBehavior, phoneOptions);
      $("[data-mask='uf']").mask("SS");
    }

    var phoneOptions = {
      onKeyPress: function (val, e, field, options) {
          field.mask(phoneBehavior.apply({}, arguments), options);
      }
    };

    function phoneBehavior(val) {
      return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    }
}();
