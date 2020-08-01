var express = require('express');
var router = express.Router();
var db = require('../db')
var bodyParser = require('body-parser');

var VerifyToken = require('../auth/VerifyToken');
var Event = require('./Event');

var request=require('request');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.put('/update/:id', function(req, res, next) {

    var body = req.body;

    Event.updateEvent(req.params.id, body, function(err, info, next) {
        if (err) {
            return res.status(500).send({ error: 'Something failed!' })
        }
        else {
            return res.status(200).send(info);
        }
      });
});

router.get('/:id', function(req, res, next) {

    Event.getEventById(req.params.id, function(err, event, next) {
        if (err) {
            return res.status(500).send({ error: 'Something failed!' })
        }
        else {
            if(event[0]){
                console.log(event[0].localisation);
                return res.status(200).send(event);
            }
        }
      });
});

router.get('/', function(req, res, next) {

    Event.getAllEvent(function(err, user, next) {
        if (err) {
            return res.status(500).send({ error: 'Something failed!' })
        }
        else {
            console.log(user[0])
            return res.status(200).send(user);
        }
      });
});

router.put('/create_event', function(req, res1, next) {

    //var newuser = req.body;
    request.get('https://maps.googleapis.com/maps/api/geocode/json?address=97+chemin+des+faraches,sollies+toucas&key=AIzaSyASeAUXCv09F1AVrNSaEc2OpZAeQcG1vDg', function(err,res,body){
        if (err) {
            return res.status(500).send({ error: 'Something failed!' })
        }
        else {
            var geo = JSON.parse(body);
            var geo1 = geo.results[0].geometry.location;
            console.log(geo1)

            var newuser = {
                "nom": "max", 
                "mail": "a@a",
                "telephone": "adldz",
                "adresse": "aeeklekl dlldelcde",
                "profil_image": "sevan.png",
                "localisation": JSON.stringify(geo1) 
            }


            Event.createEvent(newuser, function(err, newuser, next) {
                if (err) {
                    return res1.status(500).send({ error: 'Something failed!' })
                }
                else {
                    return res1.status(200).send({ message: 'Utilisateur crée' });    
                }
            });
        }
    });
});

router.delete('/:id', function(req, res, next) {

    var sql = `DELETE FROM event WHERE id = '${req.params.id}'`;

    db.query(sql, function(err){
        if(err){
            return res.json({ message: 'error' });
        }   
        else{
            return res.json({ message: 'sucess' });
        } 
    });
});

module.exports = router;