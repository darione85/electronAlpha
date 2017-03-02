var alphaApp = angular.module('alpha',['ui.bootstrap', 'ngRoute', /**'ngTable',*/ 'ui.grid']);

alphaApp.factory('_', function() {
    return window._; // assumes underscore has already been loaded on the page
});

alphaApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        template: '<main></main>'
    })
        .when('/daticoncessione',{
            template:'<daticoncessione></daticoncessione>'
        })
        .when('/daticoncessione/:id',{
            template:'<daticoncessione-edit></daticoncessione-edit>',
            resolve: {
                id: ['$route','apiService', function ($route, apiService) {
                    var routeParams = $route.current.params;

                    return routeParams.id;
                }]
            }
        })
        .when('/recapiti',{
            template:'<recapiti></recapiti>'
        });
});