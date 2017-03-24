/**
 * Created by dario on 16/01/17.
 */
(function(){

    alphaApp.component('addressbookEdit',{

        templateUrl:'app/component/addressbook/addressbookEdit.html',
        bindings: {
            onSelected: '&'
        },
        controller: function($route, addressBookService, $timeout, $uibModal){

            var ctrl = this;



            ctrl.routeParams = $route.current.params;
            ctrl.contactId = ctrl.routeParams.id;
            ctrl.contact = {};

            ctrl.opened = {};

            ctrl.enableEdit = false;

            ctrl.open = function($event, elementOpened) {
                $event.preventDefault();
                $event.stopPropagation();

                ctrl.opened[elementOpened] = !ctrl.opened[elementOpened];
            };

            ctrl.addressBookService = addressBookService;

            ctrl.addressBookService.get({_id:ctrl.contactId}, function (err, contact) {
                if (err == null){
                    $timeout(function () {
                       ctrl.contact =  contact[0];
                    },0)
                }else{
                    console.log(err);
                }
            });

            ctrl.addressModel = {
                state:"",
                address:"",
                city:"",
                postcode:"",
                province:""
            };

            ctrl.numberModel = {
                type:"",
                value:""
            };

            ctrl.mailModel = {
                type:"",
                value:""
            };

            ctrl.addAddressModel = function () {
                $timeout(function () {
                    ctrl.contact.address.push(ctrl.addressModel);
                },0)
            }
            ctrl.deleteAddress = function (key) {
                $timeout(function () {
                    ctrl.contact.address.splice(key, 1);
                },0)
            }

            ctrl.addNumberModel = function () {
                $timeout(function () {
                    ctrl.contact.number.push(ctrl.numberModel);
                },0)
            }
            ctrl.deleteNumber = function (key) {
                $timeout(function () {
                    ctrl.contact.number.splice(key, 1);
                },0)
            }

            ctrl.addMailModel = function () {
                $timeout(function () {
                    ctrl.contact.mail.push(ctrl.mailModel);
                },0)
            }
            ctrl.deleteMail = function (key) {
                $timeout(function () {
                    ctrl.contact.mail.splice(key, 1);
                },0)
            }



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
                    value:"3293955519"
                },{
                    type: "fax",
                    value:"3293955519"
                },{
                    type: "fixes",
                    value:"3293955519"
                } ],
                mail: [ {
                    type: "work",
                    value:"avv.roberta.curcio@gmail.com"
                },{
                    type: "home",
                    value:"avv.roberta.curcio@gmail.com"
                },{
                    type: "fixes",
                    value:"3293955519"
                } ],
                note: "text"
            };


            ctrl.save = function () {
                ctrl.addressBookService.update({_id: ctrl.contact._id},ctrl.contact, function (err, contact) {
                    if (err == null){
                        $timeout(function () {
                            console.log(contact)
                        },0)
                    }else{
                        console.log(err);
                    }
                });
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


