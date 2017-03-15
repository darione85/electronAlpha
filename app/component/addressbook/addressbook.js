/**
 * Created by dario on 16/01/17.
 */
(function(){

    alphaApp.component('addressbook',{

        templateUrl:'app/component/addressbook/addressbook.html',
        bindings: {
            onSelected: '&'
        },
        controller: function($location){
            var ctrl = this;

            console.log("addressbook component" );

            ctrl.isAuthenticated = false;
            ctrl.selectedMenu = "addressbook";

            ctrl.loginCallback= function () {
                ctrl.isAuthenticated = true;
                $location.path( "/addressbook" );

            }

            ctrl.logoutCallback= function () {
                ctrl.isAuthenticated = false;
            }


        }
    });
})();