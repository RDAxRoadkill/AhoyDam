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
        conn.query(query, [obj.naamOptreden, obj.kaarten], function (err, rows) {
            var kaarten = obj.kaarten;
            var beschikbareKaarten = rows[0].beschikbareKaarten;
            var uitkomst = beschikbareKaarten - kaarten;
            console.log(uitkomst);
            if (err) {
                console.log("err");
                return callback(err,null);
            } 
            if(uitkomst >= 0  || uitkomst == 0){
                console.log("Order mag uitgevoerd worden");
                console.log(callback);
                return callback(null, rows);
            }
            if(uitkomst < 0){
                console.log("Error");
            }
        });
    })
}; 

Bestelling.calcPrijs = function(obj, callback){
  var query = "select ticketPrijs from `Optreden` where naamOptreden = ?";  
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.naamOptreden, obj.kaarten], function (err, rows) {
            var kaarten = obj.kaarten;
            var ticketPrijs = rows[0].ticketPrijs;
            console.log(ticketPrijs);
            var prijs = Math.floor(obj.kaarten * ticketPrijs * 100) / 100;
            console.log(prijs);
            if (err) {
                console.log("err");
                return callback(err,null);
            } else{
                var showPrijs = [];

            for (var i = 0; i < rows.length; i++) {
                    showPrijs.push({
                        "prijs": prijs,
                    });
                }
                return callback(null, showPrijs);
            }
        });
    })
};

module.exports = Bestelling;