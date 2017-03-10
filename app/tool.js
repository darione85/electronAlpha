/**
 * Created by dario on 02/03/17.
 */

var userEdb = 'alpha';
var pwdDb = 'RR9bYwXtwR552Dtu';

var Sequelize = require('sequelize');;

var sequelize = new Sequelize(
    userEdb,
    userEdb,
    pwdDb,
    {
        // port: 13306,
        host: "130.251.104.2",
        logging: console.log,
        define: {
            timestamps: false
        }
    }
);

// var AddressBook = sequelize.define('addressBook', {
//     title:       Sequelize.STRING,
//     description: Sequelize.TEXT
// });
// var Task = sequelize.define('Task', {
//     title:       Sequelize.STRING,
//     description: Sequelize.TEXT,
//     deadline:    Sequelize.DATE
// });
// Project.hasMany(Task);

sequelize
.authenticate()
.then(function () {
    console.log('Connection successful');
})
.catch(function(error) {
    console.log("Error creating connection:", error);
});