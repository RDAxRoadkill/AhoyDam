var mysql = require('./db.js');

var Agenda = function () {
    naam = '';
    beginDatum = '';
    eindDatun = '';
    artiest = '';
    genre = '';
    zaal = '';
};

Agenda.getOptredens = function (callback) {
    var query = "SELECT * FROM `agenda` ORDER BY `id` ASC;";
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, function (err, rows) {
            if (err) {
                return callback(err);
            }
            var agenda = [];

            for (var i = 0; i < rows.length; i++) {
                agenda.push({
                    "id": rows[i].id,
                    "naam": rows[i].naam,
                    "beginDatum": rows[i].beginDatum,
                    "eindDatum": rows[i].eindDatum,
                    "artiest": rows[i].artiest,
                    "genre": rows[i].genre,
                    "zaal": rows[i].zaal
                });
            }
            return callback(null, agenda);
        })
    });
};

Agenda.newOptreden = function (obj, callback) {
    var query = "INSERT INTO `agenda` VALUES(NULL,?,?,?,?,?,?)";

    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.naam, obj.beginDatum, obj.eindDatum, obj.artiest, obj.genre, obj.zaal], function (err, rows) {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, rows);
            }
        });
    })
};

module.exports = Agenda;