var express = require('express');
var path = require('path');
var router = express.Router();
var sess;
var prijs = null;

//Includes
var User = require('./user.js');
var Login = require('./login.js');
//var Agenda = require('./agenda.js');
var Concert = require('./concert.js');
var Rol     = require('./rol.js');
var Artiest = require('./artiest.js');
var Genre   = require('./genre.js');
var Zaal   = require('./zaal.js');
var Categorie   = require('./categorie.js');
var Bestelling   = require('./bestelling.js');
var Email = require('./mail.js')
var Speciaal   = require('./extraOpgaves/speciaal.js');
var Onderhoud   = require('./extraOpgaves/onderhoud.js');
var Schoonmaak   = require('./extraOpgaves/schoonmaak.js');

//Index
router.get('/', function (req, res) {
   res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

//Gebruikers
router.post('/inschrijven', function(req, res){
    var post = {
        email: req.body.email,
        voornaam: req.body.voornaam,
        achternaam: req.body.achternaam,
    }
    
    Email.newMail(post, function(err, callback){
        if(err) {
            console.log(err);
             res.redirect('/#/errorMail'); 
        } else {
            console.log("Mail aan mailing list toegevoegd");
            res.redirect('/#/successMail'); 
        }
    })
    
});

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
    User.checkUser(postLogin, function(err, callback){
       console.log(callback);
       if(err){
           console.log(err);
           res.redirect('/#/errorStandaard');
       } 
        if(callback => 1){
            console.log("Email is al in gebruik");
        }
        if(callback == 0){
        console.log('createGebruiker geactiveerd');
        User.newUser(postGebruiker, function (err, callback) {
            if (err) {
                console.log(err);
            } else {
                console.log('CreateLogin geactiveerd');
                Login.newLogin(postLogin, function (err, callback) {
                    if (err) {
                     console.log(err);
                      res.redirect('/#/errorRegistreer');
                    } else {
                     res.redirect('/#/login');

                    }
                });
            }
        });
      }
    })
});
/*
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
});
*/

//Inlog Controle
router.get('/loginUser', function(req, res){
    console.log("Inlog check gestart!");
    console.log(sess.id);
    console.log(sess.rol);
    if(sess.rol && sess.id != undefined){
        res.send("Gebruiker is ingelogd!");
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
        if(callback == 0){
            res.redirect('/#/errorLogin'); 
        }
        if(callback == 1){
            console.log("Sessie aanmaken");
            sess.email = req.body.email;
            sess.pwd   = req.body.wachtwoord;
            console.log("Gebruikt email " + sess.email + "Gebruikt pwd: " + sess.pwd);
            console.log("Rol checken");
            Login.checkRol(post, function(err, callback){
                if (err){
                    console.log(err);
                  //  res.render('/#/errorLogin');
                } 
                if(callback == 1){
                    sess.rol = callback;
                    console.log(callback);
                    res.redirect('/#/successLogin');
                    //res.redirect('/#/addZaal');
                }
                if(callback == 2){
                    sess.rol = callback;
                    console.log(callback);
                    res.redirect('/#/successLogin');
                    //res.redirect('/#/addZaal');
                }
                if(callback == 3){
                    sess.rol = callback;
                    console.log(callback);
                    res.redirect('/#/successLogin');
                    //res.redirect('/#/addZaal');
                }
                if(callback == 4){
                    sess.rol = callback;
                    console.log(callback);
                    //res.redirect('/#/successLogin');
                    res.redirect('/#/addZaal');
                }
                if(callback == 5){
                    sess.rol = callback;
                    console.log(callback);
                    res.redirect('/#/successLogin');
                    //res.redirect('/#/addZaal');
                }
            })
        }
        if(callback == 0){
            console.log("Error melding: w8woord of email niet correct");
        }
    })
});

router.get('/addZaal', function(req, res){
    console.log("GOTCHA!");
    sess = req.session;
    if(sess.rol == 4){
        console.log("allowed!");
        
    } 
    if(sess.rol != 4){
        console.log("FORBIDDEN!");
        res.redirect('/#/errorStandaard');
        return;
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
       naamOptreden: req.body.naamOptreden,
       artiest: req.body.artiest,
       optredenDatum: req.body.optredenDatum,
       evenementenType: req.body.evenementenType,
       beginTijd: req.body.beginTijd,
       eindTijd: req.body.eindTijd,
       kaartenVerkoopEinde: req.body.kaartenVerkoopEinde,
       beschikbareKaarten: req.body.beschikbareKaarten,
       ticketPrijs: req.body.ticketPrijs,
       bestelling: req.body.bestellingnummer,
       idZaal: req.body.idZaal,
       zaal: req.body.idZaal
   }; 
    console.log('/datum check!');
    Concert.checkDatum(post, function(err, callback){
       console.log(callback);
       if(err){
           console.log(err);
           res.redirect('/#/errorStandaard');
       } 
        if(callback >= 1){
            console.log("Datum is al bezet!!");
            res.redirect('/#/errorConcert');
        }
        if(callback == 0){
            Speciaal.checkDatum(post, function(err, callback){
               console.log(callback);
               if(err){
                   console.log(err);
                   res.redirect('/#/errorStandaard');
               } 
                if(callback >= 1){
                    console.log("Datum is al bezet!!");
                    res.redirect('/#/errorConcert');
                }
                if(callback == 0){
                    console.log('/concert geactiveerd');
                    Concert.addConcert(post, function (err, callback){
                        if(err){
                            console.log(err);
                        }
                        else {
                            res.redirect('/#/agenda');
                        }
                    })
                }
            });
  
        }
    });
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
        naamOptreden: req.body.naamOptreden,
        bestelling: req.body.bestelling
    };
   console.log('/Concert gekozen!');
   Bestelling.selectOptreden(post, function(err, callback){
       if(err){
           console.log(err);
       } else {
           sess = req.session;
           sess.idOptreden = callback;
           console.log(sess.idOptreden);
           //BestelNummer
           console.log("Check Bestelling!");
           Bestelling.selectBestelling(post, function(err, callback){
               if(err){
                   console.log(err);
               } else {
                    console.log("Gelukt! nog afhandelen!");
                    sess.Bestelling = callback
                    console.log(sess.Bestelling);
                    sess.naamOptreden =  req.body.naamOptreden;
                    console.log("naamOptreden " +sess.naamOptreden);
                    console.log("Bestelling " +sess.Bestelling);
                    res.redirect('/#/addBestelling');
               }
           })
       }
   })
}); 
/*
router.get('/addBestelling', function (req, res){
    console.log("GOTCHA!");
    var post = {
        kaarten: req.body.aantalKaarten,
        naamOptreden: sess.naamOptreden
    };
    //Tickets
           console.log("Check tickets!");
           Bestelling.checkTickets(post, function(err, callback){
            if(err){
                console.log(err);
            } else {
                console.log("Gelukt! nog afhandelen!");
                console.log(callback);
                sess = req.session;
                sess.kaarten =  req.body.aantalKaarten;
                console.log("kaarten " +sess.kaarten);
                console.log("naamOptreden " +sess.naamOptreden);
            }
            }) 
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
*/
//Bestelling
router.post('/newPayment', function (req, res){
    var post = {
        idOptreden: sess.idOptreden,
        kaarten: req.body.aantalKaarten,
        naamOptreden: sess.naamOptreden,
        bestellingNummer: sess.Bestelling,
        uitkomst: null,
    };           
    //Tickets
    console.log("<===== checkTickets! =====>");
    Bestelling.checkTickets(post, function(err, callback){
        if(err){
             console.log(err);
             res.redirect('/#/errorBetaal');
        } else {
            sess = req.session;
            sess.kaarten =  req.body.aantalKaarten;
            console.log("Geselecteerde kaarten: " +sess.kaarten);
            console.log('Sessie waardes zijn, kaarten: ' +sess.kaarten + " en naam optreden is " + sess.naamOptreden + "bestellingNummer is: " + sess.Bestelling);
            //Prijs berekening
            Bestelling.calcPrijs(post, function(err, callback){
             if(err){
                 console.log(err);
                 res.redirect('/#/errorBetaal');
             } else {
             console.log("Gelukt! Prijs Berekend!");
             //Uitvoeren van betaling voltooing, wachten tot deze is voltooid. (vast houden van write?) check ook voor ratRaces, zodra voltooid transactie beginnen
             console.log('Transactie beginnen');
             //Inserts in Bestelling
                 Bestelling.addBestelling(post, function(err, callback){
                  if(err){
                      console.log(err);
                      res.redirect('/#/errorBetaal');
                  } else {
                  console.log("Genereer order gelukt!");
                 //Inserts in optredenRegel
                    Bestelling.addOptredenRegel(post, function(err, callback){
                        if(err){
                            console.log(err);
                            res.redirect('/#/errorBetaal');
                        } else {
                            console.log("Genereer optredenRegel gelukt!");
                            //Ticket verlaging
                            Bestelling.verlaagTickets(post, function(err, callback){
                                if(err){
                                    console.log(err);
                                    res.redirect('/#/errorBetaal');
                                } else {
                                    console.log("Tickets zijn verlaagd!");
                                    res.redirect('/#/successBetaal');
                                }
                            })
                            }
                     })
                    }
                  });
             }
           })
        }
    })
    //Uitvoeren van login check
    //console.log('Inserts om BestellingRegel');
    //console.log('kaart codes genereren');
    //console.log('Mail naar klant versturen');
});

//Extra Opdracht Routes
//Opdracht 7: Speciaal Evenement
router.post('/newSpeciaal', function (req, res){
   var post = {
       idAgenda: null,
       idSpeciaalEvenement: null,
       SpeciaalEvenementType: req.body.SpeciaalEvenementType,
       beschrijvingEvent: req.body.beschrijvingEvent,
       begin: req.body.begin,
       eind: req.body.eind,
       zaal: req.body.zaal,
       idZaal: req.body.zaal,
       speciaalEvenement: req.body.speciaalEvenement,
       optredenDatum: req.body.optredenDatum,
   }; 
    console.log('/datum check!');
    Concert.checkDatum(post, function(err, callback){
       console.log(callback);
       if(err){
           console.log(err);
           res.redirect('/#/errorStandaard');
       } 
        if(callback >= 1){
            console.log("Datum is al bezet!!");
            res.redirect('/#/errorConcert');
        }
        if(callback == 0){
            Speciaal.checkDatum(post, function(err, callback){
               console.log(callback);
               if(err){
                   console.log(err);
                   res.redirect('/#/errorStandaard');
               } 
                if(callback >= 1){
                    console.log("Datum is al bezet!!");
                    res.redirect('/#/errorConcert');
                }
                if(callback == 0){
                    console.log('/Speciaal toevoegen geactiveerd');
                    Speciaal.addSpeciaal(post, function(err, callback){
                       if(err){
                           console.log(err);
                       } else {
                           console.log("Toevoegen van evenement gelukt!");
                       }
                    });
                }
            });
        }
    });
});

//Opdracht 4: Schoonmaak
router.post('/newSchoonmaak', function (req, res){
   var post = {
       idAgenda: null,
       idSchoonmaak: null,
       SchoonmaakType: req.body.SchoonmaakType,
       beschrijving: req.body.beschrijving,
       begin: req.body.begin,
       eind: req.body.eind,
       zaal: req.body.zaal,
       idZaal: req.body.zaal,
       beginTijd: req.body.begin,
       eindTijd: req.body.eind,
       schoonmaak: req.body.schoonmaak,
       optredenDatum: req.body.optredenDatum,
   }; 
    console.log('/datum check!');
    Schoonmaak.checkDatumAgenda(post, function(err, callback){
      if(err){
         console.log(err);
       } 
       if(callback == 0){
            console.log("Datum & tijd zijn vrij in Agenda");
            Schoonmaak.checkDatumOptreden(post, function(err, callback){
              if(err){
                 console.log(err);
               } 
               if(callback == 0){
                   console.log("Datum & tijd zijn vrij in Optreden");
                    console.log('/Schoonmaak toevoegen geactiveerd');
                     Schoonmaak.addSchoonmaak(post, function(err, callback){
                      if(err){
                         console.log(err);
                       } else {
                         console.log("Toevoegen van schoonmaken gelukt!");
                       }
                     });
               }
               if(callback >= 1){
                console.log("Datum is al bezet!!");
                res.redirect('/#/errorConcert');
                }
            })
     };
     if(callback >= 1){
            console.log("Datum is al bezet!!");
            res.redirect('/#/errorConcert');
    }   
    });
});

//Extra Extra
//Opdracht 5: Onderhoud
router.post('/newOnderhoud', function (req, res){
   var post = {
       idAgenda: null,
       idOnderhoud: null,
       OnderhoudType: req.body.OnderhoudType,
       beschrijving: req.body.beschrijving,
       begin: req.body.begin,
       eind: req.body.eind,
       zaal: req.body.zaal,
       onderhoud: req.body.onderhoud,
       optredenDatum: req.body.optredenDatum,
   }; 
    console.log('/datum check!');
    //Check laten uitvoeren
    Onderhoud.addSpeciaal(post, function(err, callback){
       if(err){
           console.log(err);
       } else {
           console.log("Toevoegen van onderhoud gelukt!");
       }
    });
});
module.exports = router;
