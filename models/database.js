const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "pamplemousse"
});

connection.connect(function (err) {
    if (err) {
        throw err;
    }
});


console.log('connecté à la base de données MySQL');

module.exports = connection;