/**
 * Created by dario on 16/01/17.
 */
(function(){

    var Datastore = require('nedb');
    //var db = new DataStore({ filename: __dirname + '/db.json', autoload: true });
    var db = new Datastore({ filename: 'db/invoiceDb', autoload: true });

    alphaApp.service('invoiceService', ['$http', '$window', '$rootScope','$timeout', function($http, $window, $rootScope,$timeout) {

        console.log("invoiceService loaded");

        return{

            insert:function (obj, callback) {
                db.insert(obj, callback);
            },

            get:function (obj,callback) {

                db.find(obj,callback);
            },

            update:function (obj,objUpdated,callback) {

                db.update(obj, objUpdated,callback);
            }

        }

    }]);
})();