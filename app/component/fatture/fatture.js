/**
 * Created by dario on 16/01/17.
 */
(function(){

    alphaApp.component('fatture',{

        templateUrl:'app/component/fatture/fatture.html',
        bindings: {
            onSelected: '&'
        },
        controller: function($location){
            var ctrl = this;

            console.log("fatture component" );

            ctrl.isAuthenticated = false;
            ctrl.selectedMenu = "fatture";

            ctrl.loginCallback= function () {
                ctrl.isAuthenticated = true;
                $location.path( "/fatture" );

            }

            ctrl.logoutCallback= function () {
                ctrl.isAuthenticated = false;
            }


        }
    });
})();