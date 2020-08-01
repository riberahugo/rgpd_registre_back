var express = require('express');
var router = express.Router();
var db = require('../db')
var bodyParser = require('body-parser');

var VerifyToken = require('../auth/VerifyToken');
var User = require('./User');

var request=require('request');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//key validation
router.get('/register/validation/:key', function(req, res, next) {
    User.getUserByKey(req.params.key, function(err, info, next) {
        if (err) {
            return res.status(500).send({ error: 'Something failed!' })
        }
        else {
            return res.status(200).send(info);
        }
      });
});

router.get('/:email/:mdp', function(req, res, next) {

    User.login(req.params.email,req.params.mdp, function(err, info, next) {
        if (err) {
            return res.status(500).send({ error: 'Something failed!' })
        }
        else {
            return res.status(200).send(info);
        }
      });
});

router.put('/update/:id', function(req, res, next) {

    var body = req.body;

    User.updateUser(req.params.id,body, function(err, info, next) {
        if (err) {
            return res.status(500).send({ error: 'Something failed!' })
        }
        else {
            return res.status(200).send(info);
        }
      });
});

router.get('/:id', function(req, res, next) {

    User.getUserById(req.params.id, function(err, user, next) {
        if (err) {
            return res.status(500).send({ error: 'Something failed!' })
        }
        else {
            if(user[0]){
                console.log(user[0].localisation);
                return res.status(200).send(user);
            }
        }
      });
});

router.get('/', function(req, res, next) {

    User.getAllUser(function(err, user, next) {
        if (err) {
            return res.status(500).send({ error: 'Something failed!' })
        }
        else {         
            console.log(user.length)
            for(let i=0;i<user.length;i++){
                console.log(user[i])
                user[i].localisation = JSON.parse(user[i].localisation)
            }
            console.log(user)
            return res.status(200).send(user);
        }
      });
});

router.put('/create_user', function(req, res1, next) {

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
                "status": "élèves",
                "password": "aaa",
                "localisation": JSON.stringify(geo1) 
            }


            User.createUser(newuser, function(err, newuser, next) {
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

    var sql = `DELETE FROM user WHERE id = '${req.params.id}'`;

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