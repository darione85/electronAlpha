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

            $ctrl.delete= function (yearToDelete) {

                $ctrl.invoiceConfig.year = _.filter($ctrl.invoiceConfig.year, function (year) {
                    return (year!= yearToDelete)
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

        templateUrl:'app/component/fatture/fatture-year.html',
        bindings: {
            onSelected: '&'
        },
        controller: function($route,$location, $timeout, invoiceConfigService, invoiceService){
            var $ctrl = this;

            console.log("fatture component" );

            $ctrl.routeParams = $route.current.params;
            $ctrl.year= $ctrl.routeParams.year;

            $ctrl.invoiceConfigService = invoiceConfigService;

            $ctrl.invoiceConfigService.get({},function (err, doc) {
                $ctrl.invoiceConfig = doc;
            });




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