angular.module('maquinario')
    .directive('fileDisplay', callFileDisplay);

function callFileDisplay($parse,  maquinarioService) {

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            setTimeout(function() {
    
                for(var i = 0; i < scope.anuncio.fotos.length; i++) {
                    maquinarioService.displayAnuncioImages(scope.anuncio.fotos[i], i);
                }
    
                maquinarioService.callImageSlider();
            }, 1500);
        }
    }
}