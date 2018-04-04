angular.module('maquinario')
    .directive('fileSetterPesquisa', callFileSetterPesquisa);

function callFileSetterPesquisa($parse,  maquinarioService) {

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var img = document.createElement('img');
            img.classList.add("thumbnail", "center-image");

            for(var i = 0; i < scope.item.imagens.length; i++) {
                if(scope.item.imagens[i] != null) {
                    img.file = scope.item.imagens[i];
                    element.append(img);
                    maquinarioService.listImagesInAnuncios(scope.item.imagens[i], img);
                    break;
                }
            }
        }
    }
}