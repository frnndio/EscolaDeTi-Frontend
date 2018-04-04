(function () {

    'use strict';

    angular
        .module('usuario')
        .directive('passwordCompare', PasswordDirective);


    function PasswordDirective() {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attr, ctrl) {

                if (!ctrl)
                    return;

                scope.$watch(attr.ngModel, validar);
                attr.$observe('passwordCompare', validar);

                function validar(valor) {

                    var val1 = ctrl.$viewValue;
                    var val2 = attr.passwordCompare;

                    if (!scope.isCadastro)
                        return valor;

                    ctrl.$setValidity('senhaValida', !val1 || !val2 || val1 === val2);

                    return valor;
                }

            }
        };
    }

})();