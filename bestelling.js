var mysql = require('./db.js');

var Bestelling = function(){
    beschikbareKaarten = '';
    idOptreden = '';
    naamOptreden = '';
}

Bestelling.selectOptreden = function(obj, callback){
  var query = "select idOptreden from `Optreden` where naamOptreden = ?";
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.naamOptreden], function (err, rows) {
            console.log("Obj.naamOptreden: " + obj.naamOptreden);
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

Bestelling.checkTickets = function(obj, callback){
    var query = "select beschikbareKaarten from `Optreden` where naamOptreden = ?";
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.naamOptreden], function (err, rows) {
            console.log("Obj.naamOptreden: " + obj.naamOptreden);
            var beschikbareKaarten = rows[0].beschikbareKaarten;
            console.log(beschikbareKaarten);
            if (err) {
                console.log("err");
                return callback(err,null);
            } else{
                return callback(null, rows);
            }
        });
    })
}; 
/*
Bestelling.checkTickets = function(obj, callback){
  var query = "select beschikbareKaarten from `Optreden` where naamOptreden = ?";
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.beschikbareKaarten], function (err, rows) {
            console.log("Obj.beschikbareKaarten: " + obj.beschikbareKaarten);
            var beschikbareKaarten = rows[0].beschikbareKaarten;
            console.log(beschikbareKaarten);
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
module.exports = Bestelling;