var mysql = require('./db.js');

var Concert = function () {
    naamOptreden = '';
    artiest = '';
    optredenDatum = '';
    evenementenType = '';
    beginTijd = '';
    eindTijd= '';
    kaartenVerkoopEinde = '';
    beschikbareKaarten = '';
    bestelling = '';
    ticketPrijs = '';
    idZaal = '';
};

Concert.checkDatum = function(obj, callback){
    //Tijd moet niks toelaten van beginTijd to eindTijd na idzaal = and beginTijd ='?' and eindTijd = '?'
    var query = "SELECT count(*) as aantal from `Optreden` where `optredenDatum` = ? and `idZaal`= ?;"
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.optredenDatum, obj.idZaal, obj.beginTijd, obj.eindTijd], function (err, rows) {
            var aantal = rows[0].aantal;
            console.log(aantal);
            if (err) {
                console.log("err");
                return callback(err,null);
            } 
            if (aantal == 0){
                console.log("Datum & zaal zijn vrij");
                return callback(null, aantal);
            }
            if (aantal => 0){
                console.log("Datum niet vrij!");
                return callback(null, aantal);
            }
            else{
                console.log("ELSE!")
            }
        });
    })
};

Concert.getEvenementenType = function (obj, callback){
    var query = "select EventType from `EvenementenType` where EventID = ?";
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.evenementenType], function (err, rows) {
            if (err) {
                console.log("err");
                return callback(err,null);
            } else{
                return callback(null, rows);
                console.log("else");
            }
        });
    })
};

Concert.addConcert = function (obj, callback) {
    var query = "INSERT INTO `optreden` values(null,?,?,?,?,?,?,?,?,?,?,?)";
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.naamOptreden, obj.artiest,  obj.optredenDatum, obj.evenementenType, obj.beginTijd, obj.eindTijd, obj.kaartenVerkoopEinde, obj.beschikbareKaarten, obj.bestelling, obj.ticketPrijs, obj.idZaal], function (err, rows) {
            if (err) {
                console.log("err");
                return callback(err,null);
            } else{
                return callback(null, rows);
                console.log("else");
            }
        });
    })
};

Concert.getOptredens = function(callback){
    var query = "SELECT * FROM `Optreden` ORDER BY `idOptreden` ASC;";
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, function (err, rows) {
            if (err) {
                return callback(err);
            }
            var optreden = [];

            for (var i = 0; i < rows.length; i++) {
                optreden.push({
                    "artiest": rows[i].artiest,
                    "optredenDatum": rows[i].optredenDatum,
                    "evenementenType": rows[i].evenementenType,
                    "naamOptreden": rows[i].naamOptreden,
                    "beginTijd": rows[i].beginTijd,
                    "eindTijd": rows[i].eindTijd,
                    "kaartenVerkoopEinde": rows[i].kaartenVerkoopEinde,
                    "beschikbareKaarten": rows[i].beschikbareKaarten,
                    "bestelling": rows[i].bestelling,
                    "ticketPrijs": rows[i].ticketPrijs,
                    "idZaal": rows[i].idZaal,
                });
            }
            return callback(null, optreden);
        })
    });
};

module.exports = Concert;