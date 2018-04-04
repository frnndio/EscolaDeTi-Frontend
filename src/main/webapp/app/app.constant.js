(function () {
    "use strict";

    var application = angular.module("time02site");

    var defaultConfig = {
        "appTitle": "time02 Escola de Ti",
        "urlApi": "http://back.time02escoladeti.com"
    };

    application.value("configuracao", defaultConfig);
})();