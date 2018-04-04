angular.module('maquinario')
    .directive('cardExpiration',

        function(){

        var directive =
            { require: 'ngModel'
                , link: function(scope, elm, attrs, ctrl){
                scope.$watch('[dadosPagamento.month,dadosPagamento.year]',function(value){
                    ctrl.$setValidity('invalid',true)
                    if ( scope.dadosPagamento.year == scope.currentYear
                        && scope.dadosPagamento.month <= scope.currentMonth
                    ) {
                        ctrl.$setValidity('invalid',false)
                    }
                    return value
                },true)
            }
            }
        return directive
    }
)