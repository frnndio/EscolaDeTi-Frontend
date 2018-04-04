!function () {

    'use strict';

    angular
        .module('usuario')
        .controller("EditarUsuarioController", EditarUsuarioController);

    EditarUsuarioController.$inject = ['$scope', '$usuario', '$routeParams', 'toastr', '$location'];
    function EditarUsuarioController($scope, $usuario, $routeParams, toastr, $location) {
        angular.element(document)
            .ready(() => {
                //LOAD ALL MASK
                $("[data-mask='cpf']").mask("000.000.000-00");
                $("[data-mask='cnpj']").mask("00.000.000/0000-00");
                $("[data-mask='data']").mask("00/00/0000");
                $("[data-mask='cep']").mask("00000-000");
                $("[data-mask='phone']").mask(phoneBehavior, phoneOptions);
                $("[data-mask='uf']").mask("SS");
            });

        //FUNCTIONS CALL
        $scope.salvarPessoaFisica = salvarPessoaFisica;
        $scope.salvarPessoaJuridica = salvarPessoaJuridica;

        $scope.carregarEnderecoFisica = carregarEnderecoFisica;
        $scope.carregarEnderecoJuridica = carregarEnderecoJuridica;

        function init() {
            $scope.tipoPessoa = "F";
            $scope.titulo = "Olá {pessoa}";
            $scope.isCadastro = false;

            $scope.isPessoaFisica = isPessoaFisica;
            $scope.isPessoaJuridica = isPessoaJuridica;

            $scope.pessoaFisica = {};
            $scope.pessoaFisica.sexo = "MASCULINO";

            $scope.pessoaJuridica = {};

            $scope.temEnderecoPessoaFisica = false;
            $scope.temEnderecoPessoaJuridica = false;

            $usuario.getFisicaById($routeParams.id, function (res) {
                if (res.length > 0) {
                    $scope.pessoaFisica = res[0];
                    $scope.temEnderecoPessoaFisica = (res[0].cep);
                }
            });

            if (!$scope.pessoaFisica.id) {
                $scope.tipoPessoa = "J";
                $usuario.getJuridicaById($routeParams.id, function (res) {
                    if (res.length > 0) {
                        $scope.pessoaJuridica = res[0];
                        $scope.temEnderecoPessoaJuridica = (res[0].cep);
                    }
                });
            }
        }
        init();

        function carregarEnderecoFisica(cep) {
            cep = cep.replace("-", "");
            if (cep.length === 0) {
                $scope.temEnderecoPessoaFisica = false;
            }
            else if (cep.length < 8) {
                return;
            }

            $usuario.buscarEndereco(cep)
                .then(function (response) {
                    $scope.temEnderecoPessoaFisica = true;
                    $scope.pessoaFisica.endereco = response.data.logradouro;
                    $scope.pessoaFisica.bairro = response.data.bairro;
                    $scope.pessoaFisica.complemento = response.data.complemento;
                    $scope.pessoaFisica.estado = response.data.uf;
                    $scope.pessoaFisica.cidade = response.data.localidade;
                })
                .catch(function (response) {
                    $scope.temEnderecoPessoaFisica = true;
                })

        }

        function carregarEnderecoJuridica(cep) {
            cep = cep.replace("-", "");
            if (cep.length === 0) {
                $scope.temEnderecoPessoaJuridica = false;
            }
            else if (cep.length < 8) {
                return;
            }

            $usuario.buscarEndereco(cep)
                .then(function (response) {
                    $scope.temEnderecoPessoaJuridica = true;
                    $scope.pessoaJuridica.endereco = response.data.logradouro;
                    $scope.pessoaJuridica.bairro = response.data.bairro;
                    $scope.pessoaJuridica.complemento = response.data.complemento;
                    $scope.pessoaJuridica.estado = response.data.uf;
                    $scope.pessoaJuridica.cidade = response.data.localidade;
                })
                .catch(function (response) {
                    $scope.temEnderecoPessoaJuridica = true;
                })
        }

        function salvarPessoaJuridica(pessoa) {
            $usuario.salvarPessoaJuridica(pessoa, function (response) {
                if (response.status === 200) {
                    alert("Salvo com sucesso!");
                    $usuario.getAllJuridica(function (res) {
                        console.log(res);
                    })
                }
                else {
                    alert("Erro ao salvar");
                    console.error(response.message);
                }
            });
        }

        function salvarPessoaFisica(pessoa) {
            $usuario.salvarPessoaFisica(pessoa, function (response) {
                if (response.status === 200) {
                    alert("Salvo com sucesso!");
                    $usuario.getAllFisica(function (res) {
                        console.log(res);
                    })
                }
                else {
                    alert("Erro ao salvar");
                    console.error(response.message);
                }
            });
        }

        function isPessoaFisica() {
            return $scope.tipoPessoa === "F";
        }

        function isPessoaJuridica() {
            return !isPessoaFisica();
        }

        function buscarEndereco(cep) {
            $usuario.buscarEndereco(cep)
        }
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
