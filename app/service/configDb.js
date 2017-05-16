/**
 * Created by dario on 03/04/17.
 */

(function(){

    var Datastore = require('nedb');

    var db = new Datastore({ filename: 'db/configDb', autoload: true });

    alphaApp.service('configService', ['$http', '$window', '$rootScope','$timeout', function($http, $window, $rootScope,$timeout) {

        console.log("configService loaded");

        // var invoiceConfig = {
        //     type:"invoice_config",
        //     year :[2015,2016,2017]
        // };
        //
        // var taxConfig = [
        //     {
        //         type:"invoice_tax",
        //         name:"iva 22",
        //         description:"percentage",
        //         type:"%",
        //         value:22
        //     },
        //     {
        //         type:"invoice_tax",
        //         name:"contributo previdenziale",
        //         description:"percentage",
        //         type:"%",
        //         value:4
        //     },
        //     {
        //         type:"invoice_tax",
        //         name:"Ritenuta d'acconto",
        //         description:"percentage",
        //         type:"%",
        //         value:20
        //     }
        //
        // ];
        //
        // db.insert([invoiceConfig, taxConfig])

        return{

            insert:function (obj, callback) {
                db.insert(obj, callback);
            },

            get:function (obj,callback) {

                db.find(obj,callback);
            },

            update:function (obj,objUpdated,callback) {

                db.update(obj, objUpdated , {},callback);
            },
            getLogoUrl:function () {
                return''
            }

        }

    }]);
})();