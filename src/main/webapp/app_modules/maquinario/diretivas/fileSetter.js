angular.module('maquinario')
    .directive('fileSetter', callFileSetter);

function callFileSetter($parse,  maquinarioService) {

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var img = document.createElement('img');
            img.classList.add("thumbnail", "center-image");

            img.file = scope.anuncio.fotos[0];
            element.append(img);
            maquinarioService.listImagesInAnuncios(scope.anuncio.fotos[0], img);
        }
    }
}