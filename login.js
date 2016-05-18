var mysql = require('./db.js');

var Login = function () {
    email = '';
    wachtwoord = '';
};

Login.newLogin = function (obj, callback) {
    var query = "INSERT INTO `login` VALUES(NULL,?,?)";
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(query, [obj.email, obj.wachtwoord], function (err, rows) {
            if (err) {
                return callback(err,null);
            } else{
                return callback(null, rows);
            }
        });
    })
};

Login.loginUser = function (obj, callback){
    var query ="SELECT count(*) as aantal from `login` where email = ? and wachtwoord = ?";
    mysql.connection(function (err, conn){
        if(err) {
            return callback(err);
        }
        conn.query(query, [obj.email, obj.wachtwoord], function (err, rows){
            var aantal = rows[0].aantal;
            console.log(aantal);
            //console.log(callback(null, aantal))
            if(err) {
                return callback(err, null);
            }
            if (aantal == 0){
               console.log("Inlog failure");
                return callback(null, aantal);
            }
            if (aantal => 0){
               console.log("Rows hoger als 0" + rows[0]);
                return callback(null, aantal);
            } else {
                console.log("Else: " +rows[0]);
            }
        })
    });
    
};

Login.checkRol = function(obj, callback){
    var query = "select idRol as rol from GebruikerRol where idGebruiker in ( select idGebruiker from Login where email = ?)";
    mysql.connection(function (err, conn){
        if(err) {
            return callback(err);
        }
        conn.query(query, [obj.email], function(err, rows){
            console.log("Obj.mail: " + obj.email);
            var rol = rows[0].rol;
            console.log(rol);
            if (err) {
                console.log("Error");
                return callback(err,null);   
            } 
            if(rol == 1){
                console.log("Klant");
                return callback(null, rol);
            }
            if(rol == 2){
                console.log("Zaalbeheerder");
                return callback(null, rol);
            }
            if(rol == 3){
                console.log("Beheerder");
                return callback(null, rol);
            }
            if(rol == 4){
                console.log("Developer");
                return callback(null, rol);
            }
            if(rol == 5){
                console.log("Tester");
                return callback(null, rol);
            }
            else{
                return callback(null, rows);
                
            }
        })
});
};

module.exports = Login;