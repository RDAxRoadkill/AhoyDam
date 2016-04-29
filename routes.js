var express = require('express');
var path = require('path');
var router = express.Router();

var User = require('./user.js');
var Login = require('./login.js');
var Agenda = require('./agenda.js');
var Concert = require('./concert.js');


//Index
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

//Gebruikers
router.get('/registreren' , function (req, res) {
    res.sendFile(path.join(__dirname + '/public/views/partials/registreren.html'));
});

router.post('/newUser', function (req, res) {
    var postGebruiker = {
        Voornaam: req.body.Voornaam,
        Achternaam: req.body.Achternaam,
        Telefoonnummer: req.body.Telefoonnummer,
        Woonplaats: req.body.Woonplaats
    };
    
    var postLogin ={
        email: req.body.email,
        wachtwoord: req.body.wachtwoord
    }

    console.log('createGebruiker geactiveerd');
    User.newUser(postGebruiker, function (err, callback) {
        if (err) {
            console.log(err);
        } else {
            console.log('CreateLogin geactiveerd');
            Login.newLogin(postLogin, function (err, callback) {
                if (err) {
                 console.log(err);
                } else {
                 res.redirect('/#/login');
                }
            });
        }
    });
});

router.post('/loginUser', function (req, res){ 
    var post = {
        email: req.body.email,
        wachtwoord: req.body.wachtwoord
    };
    
    console.log('/login geactiveerd');
    Login.loginUser(post, function (err, callback){
        if (err){
            console.log(err);
        } else {
            console.log("geslaagd!");
        }
    })
});

/* Agenda
router.get('/agenda', function (req, res) {
    console.log('/agenda geactiveerd');
    Agenda.getOptredens(function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});
router.get('/agendaItems', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/views/partials/agenda/agenda.html'))
});

router.post('/newOptreden', function (req, res) {
    var post = {
        naam: req.body.naam,
        beginDatum: req.body.beginDatum,
        eindDatum: req.body.eindDatum,
        artiest: req.body.artiest,
        genre: req.body.genre,
        zaal: req.body.zaal
    };

    console.log('/agenda geactiveert');
    User.newUser(post, function (err, callback) {
        if (err) {
            console.log(err);
            res.redirect('/#/home');
        } else {
            res.redirect('/#/home');
        }
    })
}); */
module.exports = router;
