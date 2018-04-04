(function() {

  'use strict';

  angular
    .module('time02site')
    .config(ConfigRoutes);

  ConfigRoutes.$inject = ['$routeProvider'];
  function ConfigRoutes($routeProvider) {

    $routeProvider.when("/", {
      templateUrl: 'app_modules/index/index.html',
      controller: 'IndexController'
    });

  }

})();
