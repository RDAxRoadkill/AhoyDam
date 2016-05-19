var express = require('express');
var path = require('path');
var router = express.Router();
var sess;

//Includes
var User = require('./user.js');
var Login = require('./login.js');
var Agenda = require('./agenda.js');
var Concert = require('./concert.js');
var Rol     = require('./rol.js');
var Artiest = require('./artiest.js');
var Genre   = require('./genre.js');
var Zaal   = require('./zaal.js');
var Categorie   = require('./categorie.js');
var Bestelling   = require('./bestelling.js');
//var SpeciaalEvenement   = require('./speciaalevenement.js');
//var Onderhoud   = require('./onderhoud.js');
//var Verbouwing   = require('./verbouwing.js');

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

router.get('/login', function(req, res){
    console.log("login gevonden!");
    sess = req.session;
    sess.email;
    sess.username;
    
    if(sess.email){
        res.redirect('/admin');
    } else {
        console.log('Else: no session found');
    }
})
router.post('/loginUser', function (req, res){ 
    var post = {
        email: req.body.email,
        wachtwoord: req.body.wachtwoord
    };
    sess = req.session;
    console.log('/login geactiveerd');
    Login.loginUser(post, function (err, callback){
        console.log("Callback: " +callback);
        if (err){
            console.log(err);
        } 
        if(callback == 1){
            console.log("Sessie aanmaken");
            sess.email = req.body.email;
            sess.pwd   = req.body.wachtwoord;
            console.log("Gebruikt email" + sess.email + "Gebruikt pwd: " + sess.pwd);
            console.log("Rol checken");
            Login.checkRol(post, function(err, callback){
                if (err){
                    console.log(err);
                } 
                if(callback == 1){
                    sess.rol = callback;
                    console.log(callback);
                    //res.redirect('/#/addZaal');
                }
                if(callback == 2){
                    sess.rol = callback;
                    console.log(callback);
                    //res.redirect('/#/addZaal');
                }
                if(callback == 3){
                    sess.rol = callback;
                    console.log(callback);
                    //res.redirect('/#/addZaal');
                }
                if(callback == 4){
                    sess.rol = callback;
                    console.log(callback);
                    res.redirect('/#/addZaal');
                }
                if(callback == 5){
                    sess.rol = callback;
                    console.log(callback);
                    //res.redirect('/#/addZaal');
                }
            })
        }
        if(callback == 0){
            console.log("Error melding: w8woord of email niet correct");
        }
        else {
           // console.log("Andere error!");
        }
    })
});

router.get('/addZaal', function(req, res){
    sess = req.session;
    if(sess.rol == 4){
        console.log("allowed!");
    } 
    if(sess.rol != 4){
        console.log("FORBIDDEN!");
    } else {
        console.log("else");
    }
});

router.get('/GebruikerRol', function(req, res){
    Rol.showGebruikers( function(err, callback){
        if(err){
            console.log(err);
        } else{
            res.json(callback);
            console.log("Callback" + callback);
        }
        
    });
});

router.post('/newRol', function (req, res){
   var post ={
       Omschrijving: req.body.Omschrijving
   };
    console.log('/rol geactiveerd');
    Rol.addRol(post, function (err, callback){
        if (err){
            console.log(err);
        } else {
            console.log("Rol toevoegen gelukt!, nog afhandelen");
        }
    })
});

router.post('/GebruikerRol', function (req, res){
   var post ={
       idGebruiker: req.body.idGebruiker,
       idRol: req.body.idRol
   };
    console.log('/Rol verbinden geactiveerd');
    Rol.GebruikerRol(post, function (err, callback){
        if (err){
            console.log(err);
        } else {
            console.log("Rol verbinden gelukt!, nog afhandelen");
        }
    })
});
//Artiest
router.post('/newArtiest', function (req, res){
var post = {
    beschrijving: req.body.beschrijving,
    artiestGeluidsFragment: req.body.artiestGeluidsFragment,
    artiestFoto: req.body.artiestFoto,
    artiestVerwijzing: req.body.Verwijzing,
    artiestVideoFragment: req.body.artiestVideoFragment,
    artiestNaam: req.body.artiestNaam
   }; 
    console.log('/concert geactiveerd');
    Artiest.newArtiest(post, function (err, callback){
        if(err){
            console.log(err);
        }
        else {
            console.log("gelukt!, nog afhandelen");
        }
    })
});

router.post('/newGenre', function (req, res){
var post = {
    genreNaam: req.body.genreNaam
   }; 
    console.log('/genre geactiveerd');
    Genre.newGenre(post, function (err, callback){
        if(err){
            console.log(err);
        }
        else {
            console.log("gelukt!, nog afhandelen");
        }
    })
});

//Concert
router.post('/newConcert', function (req, res){
   var post = {
       artiest: req.body.artiest,
       optredenDatum: req.body.optredenDatum,
       evenementenType: req.body.evenementenType,
       beginTijd: req.body.beginTijd,
       eindTijd: req.body.eindTijd,
       kaartenVerkoopEinde: req.body.kaartenVerkoopEinde,
       beschikbareKaarten: req.body.beschikbareKaarten,
       ticketPrijs: req.body.ticketPrijs,
       bestelling: null,
       idZaal: req.body.idZaal
   }; 
    console.log('/concert geactiveerd');
    Concert.addConcert(post, function (err, callback){
        if(err){
            console.log(err);
        }
        else {
            console.log("gelukt!, nog afhandelen");
        }
    })
});

//Agenda
router.post('/newZaal', function (req, res){
var post = {
    zaalStatus: req.body.zaalStatus,
    zaalBeschrijving: req.body.zaalBeschrijving
   }; 
    console.log('/zaal geactiveerd');
    Zaal.newZaal(post, function (err, callback){
        if(err){
            console.log(err);
        }
        else {
            console.log("gelukt!, nog afhandelen");
        }
    })
});
/* router.post('/newGenre', function (req, res){
var post = {
    genreNaam: req.body.genreNaam
   }; 
    console.log('/genre geactiveerd');
    Genre.newGenre(post, function (err, callback){
        if(err){
            console.log(err);
        }
        else {
            console.log("gelukt!, nog afhandelen");
        }
    })
}); */

router.get('/agendaList', function (req, res) {
    console.log('/agenda geactiveerd');
    Concert.getOptredens(function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});

//Email
router.post('/newCategorie', function (req, res){
var post = {
    categorie: req.body.categorie,
   }; 
    console.log('/zaal geactiveerd');
    Categorie.newCategorie(post, function (err, callback){
        if(err){
            console.log(err);
        }
        else {
            console.log("gelukt!, nog afhandelen");
        }
    })
});
// kies concert
router.post('/selectAgenda', function (req, res) {
    var post = {
        idOptreden: req.body.idOptreden,
        kaarten: req.body.aantalKaarten,
        naamOptreden: req.body.naamOptreden
    };
   console.log('/Concert gekozen!');
   Bestelling.selectOptreden(post, function(err, callback){
       if(err){
           console.log(err);
       } else {
           console.log("Check tickets!");
           console.log(post);
           Bestelling.checkTickets(post, function(err, callback){
            if(err){
                console.log(err);
            } else {
                console.log("Gelukt! nog afhandelen!");
                console.log(callback);
                sess = req.session;
                sess.kaarten =  req.body.aantalKaarten;
                sess.naamOptreden =  req.body.naamOptreden;
                console.log("idOptreden " +sess.idOptreden);
                console.log("kaarten " +sess.kaarten);
                console.log("naamOptreden " +sess.naamOptreden);
                res.redirect('/#/addBestelling');
            }
            })
       }
   })
}); 

router.get('/addBestelling', function (req, res){
    console.log("GOTCHA!");
    var post = {
        kaarten: sess.kaarten,
        naamOptreden: sess.naamOptreden
    };
    Bestelling.calcPrijs(post, function(err, resultPrijs){
        if(err){
            console.log(err);
        } else {
            console.log("Gelukt! nog afhandelen!");
            console.log(resultPrijs);
            res.send(resultPrijs);
        }
    });
})

//Bestelling
router.post('/newPayment', function (req, res){
    console.log('/addBestelling gestart!');
    var post = {
        //idOptreden: req.body.idOptreden,
        kaarten: sess.kaarten,
        naamOptreden: sess.naamOptreden
    };
    console.log('Sessie waardes zijn, kaarten: ' +sess.kaarten + " en naam optreden is " + sess.naamOptreden);
    //console.log('Login check geactiveerd');
    //Uitvoeren van login check
    //console.log('Controle aantal tickets vrij');
    //Uitvoeren vrije tickets controle
    console.log('Betaling starten');
    Bestelling.calcPrijs(post, function(err, callback){
        if(err){
            console.log(err);
        } else {
            console.log("Gelukt! nog afhandelen!");
        }
    })
    /*Uitvoeren van betaling voltooing, wachten tot deze is voltooid. (vast houden van write?) check ook voor ratRaces, zodra voltooid transactie beginnen
    console.log('Transactie beginnen');
    console.log('Genereer betaling nummer + inserts in Bestelling');
    console.log('Inserts in OptredenRegel & Inserts om BestellingRegel');
    console.log('Aantal vrije kaartjes min aantal geselecteerde kaartjes');
    console.log('kaart codes genereren');
    console.log('Mail naar klant versturen');
    //Uitvoeren van inserts*/
});
/* Agenda
router.get('/agenda', function (req, res) {
    console.log('/agenda geactiveerd');
    Concert.getOptredens(function(err, result) {
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
