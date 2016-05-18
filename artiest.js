var mysql = require('./db.js');

var Artiest = function () {
    beschrijving = '';
    artiestGeluidsFragment = '';
    artiestFoto = '';
    artiestVerwijzing = '';
    artiestVideoFragment = '';
    artiestNaam = '';
};

Artiest.newArtiest = function (obj, callback) {
    var query = "INSERT INTO `artiest` VALUES(NULL,?,?,?,?,?,?)";
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.beschrijving, obj.artiestGeluidsFragment, obj.artiestFoto, obj.artiestVerwijzing, obj.artiestVideoFragment,obj.artiestNaam], function (err, rows) {
            if (err) {
                return callback(err,null);
            } else{
                return callback(null, rows);
            }
        });
    })
};

module.exports = Artiest;