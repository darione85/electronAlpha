/**
 * Created by dario on 16/01/17.
 */







(function(){



    alphaApp.component('invoices',{

        templateUrl:'app/component/fatture/fatture.html',
        bindings: {
            onSelected: '&'
        },
        controller: function($location, $timeout, invoiceConfigService){

            var $ctrl = this;

            console.log("fatture component" );

            $ctrl.deleteEnabled = false;

            $ctrl.invoiceConfigService = invoiceConfigService;

            $ctrl.invoiceConfigService.get({},function (err, doc) {
                $timeout($ctrl.invoiceConfig = doc[0]);
            });

            // $ctrl.invoiceConfig = {};

            // $ctrl.invoiceConfig.year = [2015,2016,2017];

            // $ctrl.invoiceConfig.tax = [
            //     {
            //         name:"iva 22",
            //         description:"percentage",
            //         type:"%",
            //         value:22
            //     },
            //     {
            //         name:"contributo previdenziale",
            //         description:"percentage",
            //         type:"%",
            //         value:4
            //     },
            //     {
            //         name:"Ritenuta d'acconto",
            //         description:"percentage",
            //         type:"%",
            //         value:20
            //     }
            //
            // ]

            $ctrl.addYear = function () {
                $ctrl.invoiceConfig.year.push($ctrl.invoiceConfig.year[$ctrl.invoiceConfig.year.length-1]+1);
            }

            $ctrl.enableDelete= function () {
                $ctrl.deleteEnabled = !$ctrl.deleteEnabled;
            }

            $ctrl.deleteYear= function (yearToDelete) {

                $ctrl.invoiceConfig.year = _.filter($ctrl.invoiceConfig.year, function (year) {
                    return (year!= yearToDelete)
                })

            }

            $ctrl.addTax= function () {

                $ctrl.invoiceConfig.tax.push({
                    type:"invoice_tax",
                    name:"Tax Name",
                    description:"percentage",
                    type:"%",
                    value:22
                })

            }



            $ctrl.deleteTax= function (taxToDelete) {

                $ctrl.invoiceConfig.tax = _.filter($ctrl.invoiceConfig.tax, function (tax) {
                    return (tax.name!= taxToDelete.name)
                })

            }

            $ctrl.save= function () {
                $ctrl.invoiceConfigService.update({_id:$ctrl.invoiceConfig._id },$ctrl.invoiceConfig,function (err, config) {
                    if(err == null){
                        $timeout(function () {
                            console.log(config);
                        },0)
                    }else console.log(err);
                })
            }

            // $ctrl.insert= function () {
            //     $ctrl.invoiceConfigService.insert($ctrl.invoiceConfig,function (err, config) {
            //         if(err == null){
            //             $timeout(function () {
            //                 console.log(config);
            //             },0)
            //         }else console.log(err);
            //     })
            // }


            $ctrl.isAuthenticated = false;

            $ctrl.selectedMenu = "invoices";

            $timeout(function () {
                $ctrl.selectedMenu = "invoices";
            });





            $ctrl.loginCallback= function () {
                $ctrl.isAuthenticated = true;
                $location.path( "/invoices" );

            }

            $ctrl.logoutCallback= function () {
                $ctrl.isAuthenticated = false;
            }


        }
    });
})();

(function(){

    alphaApp.component('invoicesYear',{

        templateUrl:'app/component/fatture/fattureYear.html',
        bindings: {
            onSelected: '&'
        },
        controller: function($route,$location, $timeout, invoiceConfigService, invoiceService){
            var $ctrl = this;

            console.log("fatture by Year component" );

            $ctrl.routeParams = $route.current.params;
            $ctrl.year= $ctrl.routeParams.year;

            $ctrl.invoiceConfigService = invoiceConfigService;

            $ctrl.invoiceService = invoiceService;

            $ctrl.invoiceConfigService.get({},function (err, doc) {
                $ctrl.invoiceConfig = doc;
            });

            $ctrl.invoiceService.get($ctrl.year,{},function (err, docs) {
                $ctrl.invoicesByYear = docs;
                console.log(docs);
            })



            $ctrl.save= function () {
                $ctrl.invoiceConfigService.update({_id:$ctrl.invoiceConfig._id },$ctrl.invoiceConfig,function (err, config) {
                    if(err == null){
                        $timeout(function () {
                            console.log(config);
                        },0)
                    }else console.log(err);
                })
            }



            $ctrl.isAuthenticated = false;

            $timeout(function () {
                $ctrl.selectedMenu = "invoices";
            });



            $ctrl.loginCallback= function () {
                $ctrl.isAuthenticated = true;
                $location.path( "/invoices" );

            }

            $ctrl.logoutCallback= function () {
                $ctrl.isAuthenticated = false;
            }


        }
    });
})();


(function(){

    alphaApp.component('invoicesEdit',{

        templateUrl:'app/component/fatture/fatturaEdit.html',
        bindings: {
            onSelected: '&'
        },
        controller: function($route,$location, $timeout, invoiceConfigService, invoiceService, addressBookService){
            var $ctrl = this;

            console.log("fatture by Year component" );

            $ctrl.routeParams = $route.current.params;

            $ctrl.year= $ctrl.routeParams.year.replace(/[^\/\d]/g,'');
            $ctrl.id= $ctrl.routeParams.id;

            $ctrl.recipient ={};
            $ctrl.address = {}

            console.log($ctrl.year);

            $ctrl.invoiceConfigService = invoiceConfigService;

            $ctrl.invoiceService = invoiceService;

            $ctrl.addressBookService = addressBookService;

            $ctrl.addressBookService.get({},function (err,obj) {
                console.log(obj[0]);
                $ctrl.recipients = obj;
                $timeout(function () {
                    $ctrl.recipient = obj[0];
                })

            })

            $ctrl.invoiceConfigService.get({},function (err, doc) {
                $ctrl.invoiceConfig = doc[0];

                console.log($ctrl.invoiceConfig.tax)
            });

            if($ctrl.id == "new"){
                console.log("nuova fattura");
                $ctrl.invoice = {}
                $ctrl.invoice.voices=[];
            }else{
                $ctrl.invoiceService.get($ctrl.year,{_id:$ctrl.id},function (err, doc) {
                    $ctrl.invoice = doc;
                });
            }


            $ctrl.save= function () {

                if($ctrl.invoice._id ){
                    $ctrl.invoiceService.insert($ctrl.year,{_id:$ctrl.id},function (err, doc) {
                        $ctrl.invoice = doc;
                    });
                }else{
                    $ctrl.invoiceService.update($ctrl.year,{_id:$ctrl.invoice._id },$ctrl.invoiceConfig,function (err, config) {
                        if(err == null){
                            $timeout(function () {
                                console.log(config);
                            },0)
                        }else console.log(err);
                    })
                }
            }

            $ctrl.addVoice = function () {
                $ctrl.invoice.voices.push({
                    name:"name",
                    description:"descr",
                    value: 10,
                    tax: []
                })
            }

            $ctrl.taxStatus = function(voice) {
                var selected = [];

                return $ctrl.voice.tax;

                // angular.forEach($scope.statuses, function(s) {
                //     if ($scope.user.status.indexOf(s.value) >= 0) {
                //         selected.push(s.text);
                //     }
                // });
                // return selected.length ? selected.join(', ') : 'Not set';
            };

            $ctrl.isAuthenticated = false;

            $timeout(function () {
                $ctrl.selectedMenu = "invoices";
            });

            $ctrl.loginCallback= function () {
                $ctrl.isAuthenticated = true;
                $location.path( "/invoices" );

            }

            $ctrl.logoutCallback= function () {
                $ctrl.isAuthenticated = false;
            }


        }
    });
})();


(function(){

    alphaApp.component('invoicesPrint',{

        templateUrl:'app/component/fatture/fatturaPrint.html',
        bindings: {
            onSelected: '&'
        },
        controller: function($route,$location, $timeout, invoiceConfigService, invoiceService){
            var $ctrl = this;

            console.log("fatture by Year component" );

            $ctrl.routeParams = $route.current.params;

            $ctrl.year= $ctrl.routeParams.year.replace(/[^\/\d]/g,'');
            $ctrl.id= $ctrl.routeParams.id;

            console.log($ctrl.year);

            $ctrl.invoiceConfigService = invoiceConfigService;

            $ctrl.invoiceService = invoiceService;

            $ctrl.invoiceConfigService.get({},function (err, doc) {
                $ctrl.invoiceConfig = doc[0];

                console.log($ctrl.invoiceConfig.tax)
            });

            if($ctrl.id == "new"){
                console.log("nuova fattura");
                $ctrl.invoice = {}
                $ctrl.invoice.voices=[];
            }else{
                $ctrl.invoiceService.get($ctrl.year,{_id:$ctrl.id},function (err, doc) {
                    $ctrl.invoice = doc;
                });
            }


            $ctrl.save= function () {

                if($ctrl.invoice._id ){
                    $ctrl.invoiceService.insert($ctrl.year,{_id:$ctrl.id},function (err, doc) {
                        $ctrl.invoice = doc;
                    });
                }else{
                    $ctrl.invoiceService.update($ctrl.year,{_id:$ctrl.invoice._id },$ctrl.invoiceConfig,function (err, config) {
                        if(err == null){
                            $timeout(function () {
                                console.log(config);
                            },0)
                        }else console.log(err);
                    })
                }
            }

            $ctrl.addVoice = function () {
                $ctrl.invoice.voices.push({
                    name:"name",
                    description:"descr",
                    value: 10,
                    tax: []
                })
            }

            $ctrl.taxStatus = function(voice) {
                var selected = [];

                return $ctrl.voice.tax;

                // angular.forEach($scope.statuses, function(s) {
                //     if ($scope.user.status.indexOf(s.value) >= 0) {
                //         selected.push(s.text);
                //     }
                // });
                // return selected.length ? selected.join(', ') : 'Not set';
            };

            $ctrl.print = function () {
                invoiceConfigService.print();
            }

            $ctrl.isAuthenticated = false;

            $timeout(function () {
                $ctrl.selectedMenu = "invoices";
            });

            $ctrl.loginCallback= function () {
                $ctrl.isAuthenticated = true;
                $location.path( "/invoices" );

            }

            $ctrl.logoutCallback= function () {
                $ctrl.isAuthenticated = false;
            }


        }
    });
})();