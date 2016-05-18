var mysql = require('./db.js');

var Agenda = function () {
    naam = '';
    beginDatum = '';
    eindDatun = '';
    artiest = '';
    genre = '';
    zaal = '';
};

/* Agenda.getOptredens = function (callback) {
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
}; */
/*
Agenda.selectOptreden = function(obj, callback){
  var query = "select idOptreden from `Optreden` where naamOptreden = ?";
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.idOptreden], function (err, rows) {
            console.log("Obj.idOptreden: " + obj.idOptreden);
            console.log("Obj.aantalKaarten: " + obj.aantalKaarten);
            var idOptreden = rows[0].idOptreden;
            console.log(idOptreden);
            if (err) {
                console.log("err");
                return callback(err,null);
            } else{
                return callback(null, rows);
            }
        });
    })
};

*/
Agenda.getOptredens = function(callback){
    var query = "SELECT * FROM `Optreden` ORDER BY `idOptreden` ASC;";
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
                    "artiest": rows[i].artiest,
                    "optredenDatum": rows[i].optredenDatum,
                    "evenementenType": rows[i].evenementenType,
                    "naamOptreden": rows[i].naamOptreden,
                    "beginTijd": rows[i].beginTijd,
                    "eindTijd": rows[i].eindTijd,
                    "kaartenVerkoopEinde": rows[i].kaartenVerkoopEinde,
                    "bestelling": rows[i].bestelling,
                    "ticketPrijs": rows[i].ticketPrijs,
                    "idZaal": rows[i].idZaal,
                });
            }
            return callback(null, agenda);
        })
    });
};

Agenda.newOptreden = function (obj, callback) {
    var query = "INSERT INTO `agenda` VALUES(NULL,?,?,?,?,?,?,?)";

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