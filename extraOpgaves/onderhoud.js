/*onderhoudID(AI), onderhoudtype, beschrijving 
insert into onderhoud values(null, 'Verbouwing', 'Verbouwing van zaal 2');
/* Begin & eind tijd, zaalID, speciaalevenementID
insert into agenda values('2016-05-31 08:00:00', '2016-05-31 21:00:00', 3, null, 1, null, null, null);
beschrijving Event
select idSpeciaalEvenement from speciaalevenement where beschrijvingEvent = 'test01';
*/
var mysql = require('../db.js');

var Onderhoud = function () {
    idAgenda = '';
    idOnderhoud = '';
    OnderhoudType = '';
    beschrijving = '';
    begin = '';
    eind = '';
    zaal = '';
    onderhoud = '';
    optredenDatum = '';
};
Onderhoud.addSpeciaal = function(obj, callback){
  var query   = "INSERT INTO onderhoud VALUES(null, ?, ?);";
  var query2  = "SELECT idOnderhoud FROM onderhoud WHERE beschrijving = ?";
  var query3  = "INSERT INTO agenda VALUES(null, ?, ?, ?, null, null, ?, null, null, null, ?);"
  
   mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.OnderhoudType, obj.beschrijving], function (err, rows) {
            console.log(obj.OnderhoudType);
            console.log(obj.beschrijving);
            if (err) {
                console.log("err");
                return callback(err,null);
            } else{
                console.log("else");
            conn.query(query2, [obj.beschrijving, obj.idOnderhoud], function (err, rows) {
                    obj.idOnderhoud = rows[0].idOnderhoud;
                    console.log(obj.idOnderhoud);
                    if (err) {
                        console.log("err");
                        return callback(err,null);
                    } else{
                    conn.query(query3, [obj.begin, obj.eind, obj.zaal, obj.idOnderhoud ,obj.optredenDatum], function (err, rows) {
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

module.exports = Onderhoud;