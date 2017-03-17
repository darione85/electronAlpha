var alphaApp = angular.module('alpha',['ui.bootstrap', 'ngRoute', /**'ngTable',*/ 'ui.grid','xeditable']);

alphaApp.factory('_', function() {
    return window._; // assumes underscore has already been loaded on the page
});

alphaApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        template: '<main></main>'
    })
        .when('/addressbook',{
            template:'<addressbook></addressbook>'
        })
        .when('/addressbook/:id',{
            template:'<addressbook-edit></addressbook-edit>',
            resolve: {
                id: ['$route', function ($route) {
                    var routeParams = $route.current.params;
                    console.log("-->addressBookEdit:"+routeParams.id);
                    return routeParams.id;

                }]
            }
        })
        .when('/fatture',{
            template:'<fatture></fatture>'
        });
});