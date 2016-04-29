var mysql = require('./db.js');

var User = function () {
    Voornaam = '';
    Achternaam = '';
    Woonplaats = '';
    Telefoonnummer = '';
};

User.newUser = function (obj, callback) {
    var query = "INSERT INTO `gebruiker` VALUES(NULL,?,?,?,?)";
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.Voornaam, obj.Achternaam, obj.Woonplaats, obj.Telefoonnummer], function (err, rows) {
            if (err) {
                return callback(err,null);
            } else{
                return callback(null, rows);
            }
        });
    })
};

/* nog fixen */
User.CheckUser = function (obj, callback) {
    var query = "SELECT email from `user` where email = ?";
    mysql.connection(function (err, conn){
        if(err) {
            return callback(err);
        }
        conn.query(query, [obj.email], function(err){
            if (obj.length > 0) {
                if (obj) {
                      console.log("Test:" + obj);
                    }
            }
            if (obj.length == 0) {
                if (obj) {
                      console.log("Null:" + obj);
                    }
            }
            
        });
    })
}

module.exports = User;