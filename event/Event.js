var sql = require('../db');

var Event = function(event) {
   
};

Event.createEvent = function (newevent, result) {    
    
    sql.query("INSERT INTO event set ?", newevent, function (err, res) {
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


Event.getEventById = function (id, result) {   
    sql.query("SELECT * from event where id = ? ", [id] , function (err, res) {
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

Event.getAllEvent = function (result) {   
    sql.query("SELECT * from event", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });           
};



module.exports= Event;