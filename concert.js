/*var mysql = require('./db.js');

var Concert = function () {
    voornaam = '';
    email = '';
    wachtwoord = '';
    telefoon = '';
    woonplaats = '';
    image = '';
};

User.newUser = function (obj, callback) {
    var query = "INSERT INTO `concert` values()";
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.], function (err, rows) {
            if (err) {
                return callback(err,null);
            } else{
                return callback(null, rows);
            }
        });
    })
};*/