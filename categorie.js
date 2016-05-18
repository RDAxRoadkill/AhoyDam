var mysql = require('./db.js');

var Categorie = function () {
    categorie = '';
}

Categorie.newCategorie = function (obj, callback) {
    var query = "INSERT INTO `categorie` VALUES(NULL,?)";
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.categorie], function (err, rows) {
            if (err) {
                return callback(err,null);
            } else{
                return callback(null, rows);
            }
        });
    })
};

module.exports = Categorie;