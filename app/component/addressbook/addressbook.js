/**
 * Created by dario on 16/01/17.
 */
(function(){

    alphaApp.component('addressbook',{

        templateUrl:'app/component/addressbook/addressbook.html',
        bindings: {
            onSelected: '&'
        },
        controller: function($timeout ,$location, addressBookService){
            var ctrl = this;
            //number of contact
            ctrl.count = 0;

            ctrl.addressBookService = addressBookService;

            ctrl.filterByName = "";
            ctrl.filterBySurname = "";


            var doc = {
                title: "avv",
                name: 'Roberta',
                surname: 'Curcio',
                piva: '05422425',
                cf: 'ccrt',
                birthDay:'new Date()',
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
            
            // this.addressBookService.insert(doc,function (err, docs) {
            //
            //     console.log(err);
            //     console.log(docs)
            // })

            //init loading all addresses
            ctrl.addressBookService.get({},function (err, doc) {
                if (err != null){
                    console.log(err);
                }else{

                    $timeout(function () {
                        //console.log(doc);
                        ctrl.gridOptions.data = doc;
                        ctrl.count = doc.length;
                        ctrl.addressBook  = doc;
                    },0)
                }

            });

            ctrl.gridOptions = {
                enableFiltering: true,
                // onRegisterApi: function(gridApi){
                //     ctrl.gridApi = ctrl.data;
                // },
                columnDefs: [
                    // { field: 'id' },
                    { field: '_id', enableFiltering: true},
                    { field: 'name', enableFiltering: true},
                    { field: 'surname', enableFiltering: true},
                    { field: 'piva', enableFiltering: true, cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><a ng-href="#!/daticoncessione/{{row.entity.id}}">{{row.entity.id}}</a></div>'},
                    // { field: 'gender',
                    //     filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-dropdown></div></div>',
                    //     filter: {
                    //         term: 1,
                    //         options: [ {id: 1, value: 'male'}, {id: 2, value: 'female'}]     // custom attribute that goes with custom directive above
                    //     },
                    //     cellFilter: 'mapGender' },
                    // { field: 'company', enableFiltering: false },
                    // { field: 'email', enableFiltering: false },
                    // { field: 'phone', enableFiltering: false },
                    // { field: 'age',
                    //     filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-modal></div></div>'
                    // },
                    // { field: 'mixedDate', cellFilter: 'date', width: '15%', enableFiltering: false }
                ]
            };


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