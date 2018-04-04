!function () {
    'use strict';

    angular
        .module('usuario')
        .controller("CadastrarUsuarioController", CadastrarUsuarioController);

    CadastrarUsuarioController.$inject = ['$scope', '$usuario', 'toastr', '$location', '$estados', '$cidades', 'enderecoService'];
    function CadastrarUsuarioController($scope, $usuario, toastr, $location, $estados, $cidades, enderecoService) {
        angular.element(document)
            .ready(function () {
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

        $scope.loadCidades = loadCidades;

        function init() {
            $scope.tipoPessoa = "F";
            $scope.isCadastro = true;

            $scope.titulo = "Crie sua conta, é gratis!";
            $scope.isPessoaFisica = isPessoaFisica;
            $scope.isPessoaJuridica = isPessoaJuridica;

            $scope.pessoaFisica = {};
            $scope.pessoaFisica.sexo = "MASCULINO";

            $estados.getAll()
                .then(response => {
                    $scope.estados = response
                })
        }
        init();

        function loadCidades(idEstado) {
            $cidades.getCidadesByEstado(idEstado)
                .then(response => {
                    $scope.cidades = response
                })
        }

        function salvarPessoaJuridica(pessoa) {
            var params = {
                "idCidade": pessoa.idCidade
            }

            enderecoService.salvarEndereco(params)
                .then(res => {
                    formatPessoa(pessoa);

                    pessoa.nome = pessoa.razaoSocial;
                    pessoa.idEndereco = res.idGerado;
                    $usuario.adicionarPessoaJuridica(pessoa)
                        .then(function (response) {
                            var obj = {
                                "login": pessoa.email,
                                "senha": pessoa.senha,
                                "idPessoa": { "valor": response.idGerado }
                            };
                            adicionarUsuario(obj);
                        })
                        .catch(function (response) {
                            toastr.error(response, 'Aconteceu um problema!');
                            console.error(response);
                        });
                })
                .catch(function (response) {
                    toastr.error(response, 'Houve um erro ao cadastrar o Endereco!');
                    console.error(response);
                });
        }

        function salvarPessoaFisica(pessoa) {
            var params = {
                "idCidade": pessoa.idCidade
            }

            enderecoService.salvarEndereco(params)
                .then(res => {
                    formatPessoa(pessoa);
                    var splited = pessoa.dataNascimento.split('/');
                    pessoa.dataNascimento = new Date(splited[2], splited[1] - 1, splited[0]);
                    pessoa.idEndereco = res.idGerado;
                    $usuario.adicionarPessoaFisica(pessoa)
                        .then(function (response) {
                            var obj = {
                                "login": pessoa.email,
                                "senha": pessoa.senha,
                                "idPessoa": { "valor": response.idGerado }
                            };
                            adicionarUsuario(obj);
                        })
                        .catch(function (response) {
                            toastr.error(response, 'Houve um erro ao cadastrar a pessoa!');
                            console.error(response);
                        });
                })
                .catch(function (response) {
                    toastr.error(response, 'Houve um erro ao cadastrar o Endereco!');
                    console.error(response);
                });
        }

        function adicionarUsuario(obj) {
            $usuario.adicionarUsuario(obj)
                .then(res => {
                    toastr.success('Usuário cadastrado com sucesso!', 'Sucesso!');
                    $location.path('/login')
                })
                .catch(function (response) {
                    toastr.error(response, 'Houve um erro ao cadastrar o usuário!');
                    console.error(response);
                });
        };

        function isPessoaFisica() {
            return $scope.tipoPessoa === "F";
        }

        function isPessoaJuridica() {
            return !isPessoaFisica();
        }

        function buscarEndereco(cep) {
            $usuario.buscarEndereco(cep)
        }

        function formatPessoa(pessoa) {
            var pattern = /[^0-9]/g;

            pessoa.telefone = pessoa.telefone.replace(pattern, '');
            if (pessoa.celular) {
                pessoa.celular = pessoa.celular.replace(pattern, '');
            }
            if (pessoa.cpf) {
                pessoa.cpf = pessoa.cpf.replace(pattern, '');
            }
            if (pessoa.cnpj) {
                pessoa.cnpj = pessoa.cnpj.replace(pattern, '');
            }
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
