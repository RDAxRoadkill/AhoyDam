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
    var query ="SELECT * from `login` where email = ? and wachtwoord = ?";
    mysql.connection(function (err, conn){
        if(err) {
            return callback(err);
        }
        conn.query(query, [obj.email, obj.wachtwoord], function (err, rows){
            if(err) {
                return callback(err, null);
            }
            if (rows[0].aantal = 0){
               console.log("Inlog failure");
            }
            if (rows[0].aantal > 0){
               console.log("Rows hoger als 0" + rows[0]);
            } else {
                console.log("Else: " +rows[0]);
            }
        })
    });
    
};

module.exports = Login;