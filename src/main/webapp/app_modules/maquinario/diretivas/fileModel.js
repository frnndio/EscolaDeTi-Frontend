angular.module('maquinario')
    .directive('fileModel', callFileMode);

function callFileMode($parse, maquinarioService, $base64) {

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('change', function() {
                
                if (scope.typeOfView == 'criar') {
                    var index = scope.anuncio.fotos.push(element[0].files[0]);
                    maquinarioService.listImagesInEdition(element[0].files[0], scope.anuncio, index-1);
                } else {
                    var index = scope.anuncio.fotos.push(element[0].files[0]);
                    maquinarioService.listImagesInEdition(element[0].files[0], scope.anuncio, index-1);
                    scope.anuncioMaquinarioForm.$dirty = true;
                }
            });
        }
    }
}