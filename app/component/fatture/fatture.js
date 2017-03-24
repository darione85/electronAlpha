/**
 * Created by dario on 16/01/17.
 */
(function(){

    alphaApp.component('invoices',{

        templateUrl:'app/component/fatture/fatture.html',
        bindings: {
            onSelected: '&'
        },
        controller: function($location, $timeout){
            var ctrl = this;

            console.log("fatture component" );

            ctrl.isAuthenticated = false;

            $timeout(function () {
                ctrl.selectedMenu = "invoices";
            });




            ctrl.loginCallback= function () {
                ctrl.isAuthenticated = true;
                $location.path( "/invoices" );

            }

            ctrl.logoutCallback= function () {
                ctrl.isAuthenticated = false;
            }


        }
    });
})();