var alphaApp = angular.module('alpha',[ 'ngRoute', /**'ngTable',*/ 'ui.grid','xeditable', 'ui.bootstrap','checklist-model']);

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
        .when('/invoices',{
            template:'<invoices></invoices>'
        })
        .when('/invoices/:year',{
            template:'<invoices-year></invoices-year>',
            resolve: {
                year: ['$route', function ($route) {
                    var routeParams = $route.current.params;
                    console.log("-->invoiceYear:"+routeParams.year);
                    return routeParams.year;

                }]
            }
        })
        .when('/invoices/:year/:id',{
            template:'<invoices-edit></invoices-edit>',
            resolve: {
                id: ['$route', function ($route) {
                    var routeParams = $route.current.params;
                    console.log("-->invoiceYear:"+routeParams.id);

                    return routeParams.id;

                }],
                year:['$route', function ($route) {
                    var routeParams = $route.current.params;
                    console.log("-->invoiceYear:"+routeParams.year);

                    return routeParams.year;

                }]
            }
        });

});

alphaApp.run([
    '$rootScope',
    function($rootScope) {
        // see what's going on when the route tries to change
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            // next is an object that is the route that we are starting to go to
            // current is an object that is the route where we are currently

            var currentPath =(current)? current.originalPath:"-";
            var nextPath = (next)?next.originalPath:"-";

            console.log('Starting to leave %s to go to %s', currentPath, nextPath);
        });
    }
]);