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
        conn.query(query, [obj.naamOptreden, obj.idOptreden], function (err, rows) {
            console.log("Obj.naamOptreden: " + obj.naamOptreden);
            var idOptreden = rows[0].idOptreden;
            console.log(idOptreden);
            if (err) {
                console.log("err");
                return callback(err,null);
            } else{
                return callback(null, idOptreden);
            }
        });
    })
}; 

Bestelling.selectBestelling = function(obj, callback){
  var query = "select bestelling from `Optreden` where naamOptreden = ?";
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.naamOptreden], function (err, rows) {
            console.log("Obj.naamOptreden: " + obj.naamOptreden);
            var bestelling = rows[0].bestelling;
            console.log(bestelling);
            if (err) {
                console.log("err");
                return callback(err,null);
            } else{
                return callback(null, bestelling);
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
                //var query = "update beschikbareKaarten from `Optreden` where naamOptreden = ?";
                return callback(null, rows);
            }
            if(uitkomst < 0){
                console.log("Error");
            }
        });
    })
}; 

Bestelling.verlaagTickets = function(obj, callback){
    var query = "select beschikbareKaarten from `Optreden` where idOptreden = ?";
    mysql.connection(function (err, conn){
        if(err){
            return callback(err);
        }
        conn.query(query, [obj.idOptreden, obj.kaarten], function (err, rows) {
            console.log(obj.idOptreden);
            var kaarten = obj.kaarten;
            console.log(kaarten);
            var beschikbareKaarten = rows[0].beschikbareKaarten;
            console.log(beschikbareKaarten);
            var uitkomst = beschikbareKaarten - kaarten;
            console.log(uitkomst);
            obj.uitkomst = uitkomst;
            if (err) {
                console.log("err");
                return callback(err,null);
            } 
            if(uitkomst >= 0  || uitkomst == 0){
                console.log("Order mag uitgevoerd worden");
                var query = "UPDATE `Optreden` SET `beschikbareKaarten` = '?' WHERE `optreden`.`idOptreden`=?;";
                    //Query aanpassen, beschikbare kaarten verlagen met kaarten
                    conn.query(query, [obj.uitkomst, obj.idOptreden], function (err, rows){
                        if(err){
                            return callback(err, null);
                        } else {
                            console.log("2de query gelukt!")
                            return callback(null, rows);
                        }
                    })
            }
            if(uitkomst < 0){
                console.log("Error");
                res.redirect('/#/errorBetaal');
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
//                var showPrijs = [];
//
//            for (var i = 0; i < rows.length; i++) {
//                    showPrijs.push({
//                        "prijs": prijs,
//                    });
//                }
                return callback(null, prijs );
            }
        });
    })
};

Bestelling.addBestelling = function(obj, callback){
    var query = "insert into bestelling values(null, ?, now(), 1);"
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.kaarten], function (err, rows) {
        if (err) {
                return callback(err,null);
            } else{
                return callback(null, rows);
            }
        });
    })
};

Bestelling.addOptredenRegel = function(obj, callback){
    var query = "insert into `optredenregel` VALUES(?, NULL);"
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.idOptreden], function (err, rows) {
        if (err) {
                return callback(err,null);
            } else{
                return callback(null, rows);
            }
        });
    })
};

module.exports = Bestelling;