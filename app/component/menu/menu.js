/**
 * Created by dario on 16/01/17.
 */
(function(){

    alphaApp.component('navmenu',{

        templateUrl:'app/component/menu/menuComponent.html',
        bindings: {
            onSelected: '&'
        },
        controller: function($location){
            var ctrl = this;

            console.log("menuComponent" );

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