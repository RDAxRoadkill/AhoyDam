/*eventId(AI), schoonmaakType, beschrijving 
insert into `schoonmaak` values(null, 'Wekelijkse Schoonmaak', 'Test_01');
/* Begin & eind tijd, zaalID, speciaalevenementID
insert into agenda values('2016-05-31 08:00:00', '2016-05-31 21:00:00', 3, null, 1, null, null, null);
beschrijving Event
select idSpeciaalEvenement from speciaalevenement where beschrijvingEvent = 'test01';
*/
var mysql = require('../db.js');

var Schoonmaak = function () {
    idAgenda = '';
    idSchoonmaak = '';
    SchoonmaakType = '';
    beschrijving = '';
    begin = '';
    eind = '';
    zaal = '';
    schoonmaak = '';
    optredenDatum = '';
};
Schoonmaak.addSchoonmaak = function(obj, callback){
  var query   = "INSERT INTO schoonmaak VALUES(null, ?, ?);";
  var query2  = "SELECT idSchoonmaak FROM schoonmaak WHERE beschrijving = ?";
  var query3  = "INSERT INTO agenda VALUES(null, ?, ?, ?, null, null, null, null,?, null, ?);"
   mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.SchoonmaakType, obj.beschrijving], function (err, rows) {
            console.log(obj.SchoonmaakType);
            console.log(obj.beschrijving);
            if (err) {
                console.log("err");
                return callback(err,null);
            } else{
                conn.query(query2, [obj.beschrijving, obj.idSchoonmaak], function (err, rows) {
                    obj.idSchoonmaak = rows[0].idSchoonmaak;
                    console.log(obj.idSchoonmaak);
                    if (err) {
                        console.log("err");
                        return callback(err,null);
                    } else{
                    conn.query(query3, [obj.begin, obj.eind, obj.zaal, obj.idSchoonmaak ,obj.optredenDatum], function (err, rows) {
                          if (err) {
                                console.log(err);
                                return callback(err,null);
                                } else{
                                        return callback(null, rows);
                                }
                    });
                    }
                });
           }
        });
   });
};

Schoonmaak.checkDatumAgenda = function(obj, callback){
    var query = "SELECT count(*) as aantal from `agenda` where `optredenDatum` = ? and `zaal`= ? and eind between ? and ?;"
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.optredenDatum, obj.zaal, obj.begin, obj.eind], function (err, rows) {
            var aantal = rows[0].aantal;
            console.log(aantal);
                if (err) {
                        console.log("err");
                        return callback(err,null);
                } 
                if (aantal == 0){
                        console.log("Datum, tijd & zaal zijn vrij in Agenda");
                        return callback(null, aantal);
                    }
                if (aantal => 0){
                    console.log("Datum, tijd, zaal niet vrij in Agenda");
                    return callback(null, aantal);
                }
        });
    })
};

Schoonmaak.checkDatumOptreden = function(obj, callback){
    var query = "SELECT count(*) as aantal from `optreden` where `optredenDatum` = ? and `idZaal`= ? and eindTijd between ? and ?;"
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.optredenDatum, obj.idZaal, obj.beginTijd, obj.eindTIjd], function (err, rows) {
            var aantal = rows[0].aantal;
            console.log(aantal);
                if (err) {
                        console.log("err");
                        return callback(err,null);
                } 
                if (aantal == 0){
                        console.log("Datum, tijd & zaal zijn vrij in Optreden");
                        return callback(null, aantal);
                    }
                if (aantal => 0){
                    console.log("Datum, tijd, zaal niet vrij in Optreden");
                    return callback(null, aantal);
                }
        });
    })
};


module.exports = Schoonmaak;