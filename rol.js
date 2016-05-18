var mysql = require('./db.js');

var Rol = function () {
    Omschrijving = '';
};

Rol.addRol = function (obj, callback) {
    var query = "INSERT INTO `rol` VALUES(NULL,?)";
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.Omschrijving], function (err, rows) {
            if (err) {
                return callback(err,null);
            } else{
                return callback(null, rows);
            }
        });
    })
};

Rol.GebruikerRol = function (obj, callback){
    var query = "insert into gebruikerrol values(?,?);";
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.idGebruiker, obj.idRol], function (err, rows) {
            if (err) {
                return callback(err,null);
            } else{
                return callback(null, rows);
            }
        });
    })
};

Rol.showGebruikers = function (obj, callback){
    var query = "select idGebruiker, Voornaam, Achternaam from gebruiker;";
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, function (err, rows) {
            if (err) {
                return callback(err,null);
            } 
            var users = [];
            for( var i=0; i < rows.length; i++){
                users.push({
                    //values in jason
                    "idGebruiker": rows[i].idGebruiker,
                    "Voornaam": rows[i].Voornam,
                    "Achternaam": rows[i].Achternaam
                });
             }
            return callback(null, users);
        })
    });
}

module.exports = Rol;