var db = require('../db');

var Notifications = {

    getNotifications: function(callback) { 
        return db.query('SELECT * FROM notifications', callback); 
    },

    getNotificationsFilter: function(req,callback){
        var table = [];
        id = (typeof(req.id) != 'undefined' ) ? table.push(' id ='+req.id) : null;
        idSource = (typeof(req.idSource) != 'undefined') ? table.push(' idSource ='+req.idSource) : null;
        idTarget =  (typeof(req.idTarget) != 'undefined' ) ? table.push(" idTarget = "+req.idTarget): null;
        return db.query( " SELECT * FROM  notifications  WHERE " + table.join(" AND "), callback);
    },

    insertNotifications: function (req, callback) { 
        return db.query("INSERT INTO notifications set ?", req, callback); 
    },

    updateNotifications: function(id,callback){
        return db.query("UPDATE notifications SET isRead = true WHERE id ="+ id, callback);
    },

    deleteNotifications: function (id, callback) { 
        return db.query('DELETE FROM notifications where id = '+id, callback); 
},

}

module.exports = Notifications; 