angular.module('maquinario')
    .directive('creditCardType',

        function(){

        var directive =
            { require: 'ngModel'
                , link: function(scope, elm, attrs, ctrl){
                ctrl.$parsers.unshift(function(value){
                    scope.dadosPagamento.type =
                        (/^5[1-5]/.test(value)) ? "mastercard"
                            : (/^4/.test(value)) ? "visa"
                                : undefined
                    ctrl.$setValidity('invalid',!!scope.dadosPagamento.type)
                    console.log(scope.dadosPagamento.type)
                    return value
                })
            }
            }
        return directive
    }
)