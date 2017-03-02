/**
 * Created by dario on 16/01/17.
 */
(function(){

    alphaApp.component('menu',{

        templateUrl:'app/component/menu/menuComponent.html',
        bindings: {
            onSelected: '&'
        },
        controller: function($location){
            var ctrl = this;

            console.log("navbarComponent" );

            ctrl.isAuthenticated = false;
            ctrl.selectedMenu = "daticoncessione";

            ctrl.loginCallback= function () {
                ctrl.isAuthenticated = true;
                $location.path( "/daticoncessione" );

            }

            ctrl.logoutCallback= function () {
                ctrl.isAuthenticated = false;
            }


        }
    });
})();