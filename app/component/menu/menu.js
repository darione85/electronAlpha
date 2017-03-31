/**
 * Created by dario on 16/01/17.
 */
(function(){

    alphaApp.component('navmenu',{

        templateUrl:'app/component/menu/menuComponent.html',
        bindings: {
            onSelected: '&',
            selectedMenu:'<'
        },
        controller: function($location, $route){
            var ctrl = this;

            this.$onInit = function () {

                // console.log(this.selectedMenu)

            }

            this.$onChanges = function ($event) {
                // console.log($event.selectedMenu.currentValue);
                // console.log($event.selectedMenu.previousValue);
                // console.log($event);

            }


            // console.log(ctrl.selectedMenu)

            // console.log("menuComponent" );

            ctrl.isAuthenticated = false;

            $onChanges = function (changesObj) {
                if (changesObj.selectedMenu) {
                    console.log(changesObj.selectedMenu)
                    ctrl.selectedMenu =changesObj.selectedMenu
                }

            }



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