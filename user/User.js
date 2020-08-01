var sql = require('../db');

var User = function(user) {
    this.role = user.role;
    this.email = user.email;
    this.password = user.password;
};

User.createUser = function (newuser, result) {    
    console.log(newuser)
    sql.query("INSERT INTO user set ?", newuser, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res)
            result(null, res.insertId);
        }
    });  

};

User.getUserById = function (id, result) {    

    sql.query("SELECT * from user where id = ?", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{

            result(null, res);
        }
    });           
};

User.getUserById = function (id, result) {   
    sql.query("SELECT * from user where id = ? ", [id] , function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res)
            result(null, res);
        }
    });           
};

User.getAllUser = function (result) {   
    sql.query("SELECT * from user", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });           
};

function strRandom(o) {
    var a = 10,
        b = 'abcdefghijklmnopqrstuvwxyz',
        c = '',
        d = 0,
        e = ''+b;
    if (o) {
        if (o.startsWithLowerCase) {
        c = b[Math.floor(Math.random() * b.length)];
        d = 1;
        }
        if (o.length) {
        a = o.length;
        }
        if (o.includeUpperCase) {
        e += b.toUpperCase();
        }
        if (o.includeNumbers) {
        e += '1234567890';
        }
    }
    for (; d < a; d++) {
        c += e[Math.floor(Math.random() * e.length)];
    }
    return c;
}



module.exports= User;