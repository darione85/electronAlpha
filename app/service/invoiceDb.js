/**
 * Created by dario on 16/01/17.
 */
(function(){

    var Datastore = require('nedb');
    var fs = require('fs');
    //var db = new DataStore({ filename: __dirname + '/db.json', autoload: true });
    var db = new Datastore({ filename: 'db/invoiceDb', autoload: true });

    var InvoiceDbArray = [];
    try{
        db.find({},function (err, obj) {
            try{
                var InvoiceDict = obj[0].year;
            }catch (err){
                console.log(err);
                var InvoiceDict =[ 2015,2016];
            }
            // console.log(obj);
            // per ogni anno creato a livello superiore creo un db
            InvoiceDict.forEach(function(year){

                var path = "db/ivoiceByYear/invoiceDb"+ year;

                if (fs.existsSync(path)) {
                    //se il file esiste creo un nuovo oggetto db
                    InvoiceDbArray[year] = new Datastore({ filename: path, autoload: true });

                }else{
                    fs.closeSync(fs.openSync(path, 'w'));
                    console.log("new db created");
                }

            })

        });
    }
    catch (err){
        console.log(err)
    }







    alphaApp.service('invoiceConfigService', ['$http', '$window', '$rootScope','$timeout', function ($http, $window, $rootScope,$timeout) {

        console.log("invoiceConfigService loaded");

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

    alphaApp.service('invoiceService', ['$http', '$window', '$rootScope','$timeout', function ($http, $window, $rootScope,$timeout) {

        console.log("invoiceService loaded");

        return{

            insert:function (year, obj, callback) {
                InvoiceDbArray[year].insert(obj, callback);
            },

            get:function (year, obj,callback) {

                InvoiceDbArray[year].find(obj,callback);
            },

            update:function (year, obj,objUpdated,callback) {

                InvoiceDbArray[year].update(obj, objUpdated,callback);
            },
            newInvoice:function () {
                return
            }

        }

    }]);




})();


