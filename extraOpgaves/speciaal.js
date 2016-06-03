/*eventId(AI), speciaalevenenttype, beschrijving 
insert into speciaalevenement values(null, 'Trouwerij', 'trouwerij van harry');
/* Begin & eind tijd, zaalID, speciaalevenementID
insert into agenda values('2016-05-31 08:00:00', '2016-05-31 21:00:00', 3, null, 1, null, null, null);
beschrijving Event
select idSpeciaalEvenement from speciaalevenement where beschrijvingEvent = 'test01';
*/
var mysql = require('../db.js');

var Speciaal = function () {
    idAgenda = '';
    idSpeciaalEvenement = '';
    SpeciaalEvenementType = '';
    beschrijvingEvent = '';
    begin = '';
    eind = '';
    zaal = '';
    speciaalEvenement = '';
    optredenDatum = '';
};
Speciaal.addSpeciaal = function(obj, callback){
  var query   = "INSERT INTO speciaalevenement VALUES(null, ?, ?);";
  var query2  = "SELECT idSpeciaalEvenement FROM speciaalevenement WHERE beschrijvingEvent = ?";
  var query3  = "INSERT INTO agenda VALUES(null, ?, ?, ?, null, ?, null, null, null, null, ?);"
   mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.SpeciaalEvenementType, obj.beschrijvingEvent], function (err, rows) {
            console.log(obj.SpeciaalEvenementType);
            console.log(obj.beschrijvingEvent);
            if (err) {
                console.log("err");
                return callback(err,null);
            } else{
                //return callback(null, rows);
                console.log("else");
            conn.query(query2, [obj.beschrijvingEvent, obj.idSpeciaalEvenement], function (err, rows) {
                    obj.idSpeciaalEvenement = rows[0].idSpeciaalEvenement;
                    console.log(obj.idSpeciaalEvenement);
                    if (err) {
                        console.log("err");
                        return callback(err,null);
                    } else{
                        //return callback(null, idSpeciaalEvenement);
                    conn.query(query3, [obj.begin, obj.eind, obj.zaal, obj.idSpeciaalEvenement ,obj.optredenDatum], function (err, rows) {
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

Speciaal.checkDatum = function(obj, callback){
    var query = "SELECT count(*) as aantal from `agenda` where `optredenDatum` = ? and `zaal`= ?;"
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.optredenDatum, obj.zaal], function (err, rows) {
            var aantal = rows[0].aantal;
            console.log(aantal);
                if (err) {
                        console.log("err");
                        return callback(err,null);
                } 
                if (aantal == 0){
                        console.log("Datum & zaal zijn vrij in Agenda");
                        return callback(null, aantal);
                    }
                if (aantal => 0){
                    console.log("Datum niet vrij in Agenda");
                    return callback(null, aantal);
                }
        });
    })
};

module.exports = Speciaal;