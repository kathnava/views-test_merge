const moment = require('moment');
const fetch = require('node-fetch');

exports.view = async (req, res) => {
    const response = await fetch('http://localhost:8050/api/cars/allcar/');   
    const myJson = await response.json();
    res.render('../views/pages/home', {
        user: req.user,
        getAllCar: myJson,
    });
}

exports.resultCarView = async (req, res) => {
    if(req.body.dateDepart && req.body.dateRetour){
        var dateDepart = moment(req.body.dateDepart).format('X');
        var dateRetour = moment(req.body.dateRetour).format('X');
    } else {
        var dateDepart = ""
        var dateRetour = ""
    }

    if(req.body.voiture){
        var query = req.body.voiture
    } else if(req.query.id){
        var query = req.query.id;
    }

   const response = await fetch('http://localhost:8050/api/reservation/get/all/byCar/?id=' + query); // Id à récupérer en params
   const myJson = await response.json();
   console.log('myJSON KEVIIIIIIIN', myJson)

    const getCar = await fetch('http://localhost:8050/api/cars/me/?id=' + query);
    const voiture = await getCar.json();

    if (myJson) {
        myJson.map(function(e){
            e.dateDepart = moment(e.dateDepart).format('X');
            e.dateRetour = moment(e.dateRetour).format('X');
        })
    }

    if (voiture){
        if (voiture.am === 1){
            voiture.am = "automatique"
        } else if (voiture.am === 2) { 
            voiture.am = "manuelle"
        }
    }

   res.render('../views/pages/homeReservation', {
        user: req.user,
        reservation: myJson,
        qDepart: req.body.dateDepart,
        qRetour : req.body.dateRetour,
        dateDepart: dateDepart,
        dateRetour: dateRetour,
        voiture: voiture,
   })
}