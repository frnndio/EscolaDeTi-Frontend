(function () {
    'use strict';

    angular
        .module('time02site')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', 'CategoriaService', 'maquinarioService'];
    function IndexController($scope, CategoriaService, maquinarioService) {
        $scope.categorias = [];

        function init() {
            getAll();
            findMelhoresAnuncios();
        }

        function initCarousel() {
          const owlitem = $('.item-carousel')
          owlitem.owlCarousel({
              //navigation : true, // Show next and prev buttons
              navigation: false,
              pagination: true,
              items: 6,
              itemsDesktopSmall: [979, 4],
              itemsTablet: [768, 3],
              itemsTabletSmall: [660, 2],
              itemsMobile: [400, 1]
          });

          // Custom Navigation Events
          $("#nextItem").click(function () {
              owlitem.trigger('owl.next');
          })
          $("#prevItem").click(function () {
              owlitem.trigger('owl.prev');
          })
        }

        init();

        function getAll() {
            CategoriaService.getAll()
                .then(response => {
                    $scope.categorias = response.data;
                    buscarAnuncios();
                })
        }

        function findMelhoresAnuncios() {
            maquinarioService.findMelhoresAnuncios()
                .then(response => {
                    $scope.melhoresAnuncios = response.data;
                    setTimeout(initCarousel, 2000);
                });
        }

        function buscarAnuncios() {
            for (let i = 0; i < $scope.categorias.length; i++) {
                const item = $scope.categorias[i]
                const term = "idCategoria:" + item.id.toString()

                maquinarioService.search(term)
                    .then(response => {
                        item.anuncios = response.data.content
                        while (item.anuncios.length > 6) {
                            item.anuncios.splice(6, 1)
                        }
                    })
            }
        }
    }
})();
