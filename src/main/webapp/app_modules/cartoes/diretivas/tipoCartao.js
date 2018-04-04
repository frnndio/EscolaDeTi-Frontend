angular.module('app.cartoes').directive('tipoCartao', function(){
    var directive = { require: 'ngModel', link: function(scope, elm, attrs, ctrl){
          ctrl.$parsers.unshift(function(value){

            if ((/^5[1-8]/.test(value)) && value.length == 19) {
              scope.cartaoCredito.bandeira = 'Mastercard';
            } else if ((/^4/.test(value)) && value.length == 19) {
              scope.cartaoCredito.bandeira = 'Visa';
            } else {
              scope.cartaoCredito.bandeira = '';
            }

            return value;
          });
        }
      }
    return directive
});