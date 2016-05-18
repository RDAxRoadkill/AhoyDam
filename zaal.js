var mysql = require('./db.js');

var Zaal = function () {
    genreNaam = '';
}

Zaal.newZaal = function (obj, callback) {
    var query = "INSERT INTO `zaal` VALUES(NULL,?,?)";
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.zaalStatus, obj.zaalBeschrijving], function (err, rows) {
            if (err) {
                return callback(err,null);
            } else{
                return callback(null, rows);
            }
        });
    })
};

module.exports = Zaal;