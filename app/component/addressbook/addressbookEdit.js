/**
 * Created by dario on 16/01/17.
 */
(function(){

    alphaApp.component('addressbookEdit',{

        templateUrl:'app/component/addressbook/addressbookEdit.html',
        bindings: {
            onSelected: '&'
        },
        controller: function($route, addressBookService, $timeout){
            var ctrl = this;

            ctrl.routeParams = $route.current.params;
            ctrl.contactId = ctrl.routeParams.id;
            ctrl.contact = {};

            ctrl.addressBookService = addressBookService;

            ctrl.addressBookService.get({_id:ctrl.contactId}, function (err, contact) {
                if (err == null){
                    $timeout(function () {
                       ctrl.contact =  contact[0];
                    },0)
                }else{
                    console.log(err);
                }
            })

            var doc = {
                title: "avv",
                name: 'Roberta',
                surname: 'Curcio',
                piva: '05422425',
                cf: 'ccrt',
                birthDay: new Date(),
                website:'www.avvocatocurcio.it',
                skype:'robicurcio',
                edited: new Date(),
                created:new Date(),
                address:[{
                    state:"Italia",
                    address:"via Sant'eugenio 25",
                    city :"Ceriale",
                    postcode:"17023",
                    province:"Savona"

                },{
                    state:"Italia",
                    address:"regione arroscia",
                    city :"Albenga",
                    postcode:"17031",
                    province:"Savona"
                }],
                number: [ {
                    type: "mobile",
                    phone:"3293955519"
                },{
                    type: "fax",
                    phone:"3293955519"
                },{
                    type: "fixes",
                    phone:"3293955519"
                } ],
                mail: [ {
                    type: "work",
                    phone:"avv.roberta.curcio@gmail.com"
                },{
                    type: "home",
                    phone:"avv.roberta.curcio@gmail.com"
                },{
                    type: "fixes",
                    phone:"3293955519"
                } ],
                note: "text"
            };



            console.log("addressbook Edit component" );

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