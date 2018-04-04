(function () {

    'use strict';

    angular
        .module('usuario')
        .directive('cpf', CpfDirective)
        .directive('cnpj', CnpjDirective);


    function CnpjDirective() {
        return {
            restrict: 'A',
            require: 'ngModel',

            link: function (scope, element, attr, ctrl) {
                function validar(valor) {
                    ctrl.$setValidity('cnpjValidator', cnpjValido(valor));

                    return valor;
                }

                ctrl.$parsers.push(validar);

            }
        };
    }

    function CpfDirective() {
        return {
            restrict: 'A',
            require: 'ngModel',

            link: function (scope, element, attr, ctrl) {
                function validar(valor) {
                    ctrl.$setValidity('cpfValidator', cpfValido(valor));

                    return valor;
                }

                ctrl.$parsers.push(validar);

            }
        };
    }

    function cpfValido(strCPF) {

        strCPF = strCPF.replaceAll(".", "");
        strCPF = strCPF.replaceAll("-", "");

        if (!strCPF)
            return false;

        var Soma = 0;
        var Resto;
        var i = 0;

        if (strCPF == "00000000000") return false;

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    }

    function cnpjValido(cnpj) {
        if (!cnpj)
            return false;

        cnpj = cnpj.replaceAll(".", "");
        cnpj = cnpj.replaceAll("-", "");
        cnpj = cnpj.replaceAll("/", "");

        var tamanho,
            numeros,
            digitos,
            soma,
            pos,
            i,
            resultado;

        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj == '') return false;

        if (cnpj.length != 14)
            return false;

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return false;

        // Valida DVs
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;

        return true;

    }

    String.prototype.replaceAll = function (search, replacement) {
        return this.split(search).join(replacement);
    }

})();