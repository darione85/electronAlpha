/**
 * Created by dario on 02/03/17.
 */

var Sequelize = require('sequelize');

var sequelize = new Sequelize('database', null, null, {
    dialect: 'sqlite',


    // SQLite only
    storage: '../db/database.sqlite'
});

var User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

User.sync({force: true}).then(function () {
    // Table created
    return User.create({
        firstName: 'John',
        lastName: 'Hancock'
    });
});

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });