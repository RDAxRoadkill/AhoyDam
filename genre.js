var mysql = require('./db.js');

var Genre = function () {
    genreNaam = '';
}

Genre.newGenre = function (obj, callback) {
    var query = "INSERT INTO `genre` VALUES(?, NULL)";
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.genreNaam], function (err, rows) {
            if (err) {
                return callback(err,null);
            } else{
                return callback(null, rows);
            }
        });
    })
};

module.exports = Genre;