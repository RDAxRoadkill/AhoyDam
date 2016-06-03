var mysql = require('./db.js');

var Mail = function () {
    email = '';
    voornaam = '';
    achternaam = '';
};

Mail.newMail = function (obj, callback) {
    var query = "INSERT INTO `mailinglist` VALUES(?,?,?)";
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.email, obj.voornaam, obj.achternaam], function (err, rows) {
            if (err) {
                return callback(err,null);
            } else{
                return callback(null, rows);
            }
        });
    })
};

module.exports = Mail;