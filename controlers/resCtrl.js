const fetch = require('node-fetch');
const moment = require('moment');
const LocalStorage = require('node-localstorage').LocalStorage;

var localStorage = new LocalStorage('./scratch');

exports.confirmReservation = async (req, res) => {
    if (req.user.id){
        const referer = req.headers.referer;
        var query = req.query.voiture

        const getCar = await fetch('http://localhost:8050/api/cars/me/?id=' + query);
        const voiture = await getCar.json();

        if(req.query.dateDepart && req.query.dateRetour){
            dateDepartmodif = req.query.dateDepart.slice(8, 10) + "/" + req.query.dateDepart.slice(5, 7) + "/" + req.query.dateDepart.slice(0, 4) + " à " + req.query.dateDepart.slice(11)
            dateRetourmodif = req.query.dateRetour.slice(8, 10) + "/" + req.query.dateRetour.slice(5, 7) + "/" + req.query.dateRetour.slice(0, 4) + " à " + req.query.dateRetour.slice(11)
        } else {
            dateDepartmodif = Date.now();
            dateRetourmodif = Date.now() + 1;
        }
    
        
        res.render ('../views/pages/confirmReservation.ejs', {
            resInfos: req.query,
            voiture: voiture,
            user: req.user,
            dateDepartmodif : dateDepartmodif,
            dateRetourmodif: dateRetourmodif,
            referer: referer
        })
    } else {
    res.redirect('/logUser')
    }
}

exports.createReservation = async (req, res) => {

    await fetch("http://localhost:8050/api/reservation/add", {
      
        // Adding method type
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify({
            voitureId: req.body.voiture,
            utilisateurId: req.query.id,
            dateDepart: req.body.dateDepart,
            dateRetour : req.body.dateRetour,
            adresse: req.body.adresse,
            ville: req.body.ville,
            cp: req.body.cp,
            price: req.body.price,
        }),   
        // Adding headers to the request
        headers: {
            "Content-type": "application/json"
        }
    })
    // Converting to JSON
    .then(response => response.json())
  
    // Displaying results to console
    .then(json => console.log(json))

    res.redirect('/getProfile')
}

//Routes GET Res

exports.getAllRes = async (req, res) => {

    if (req.admin.id) {
    
    const response = await fetch('http://localhost:8050/api/reservation/all');
    const response1 = await fetch('http://localhost:8050/api/cars/allcar/');
    const response2 = await fetch('http://localhost:8050/api/users/allUsers');
    const myJson = await response.json();
    myJson.map( (e) => {
        e.dateDepart =  e.dateDepart.slice(8, 10) + "/" + e.dateDepart.slice(5, 7) + "/" + e.dateDepart.slice(0, 4) + " à " + e.dateDepart.slice(11, 16)
        e.dateRetour = e.dateRetour.slice(8, 10) + "/" + e.dateRetour.slice(5, 7) + "/" + e.dateRetour.slice(0, 4) + " à " + e.dateRetour.slice(11, 16)
    })
    const myJson1 = await response1.json();
    const myJson2 = await response2.json();

    return res.render('pages/admin/showRes', {
        getAllRes : myJson,
        admin : req.admin,
        getAllCar : myJson1,
        getAllUsers: myJson2
    });
    } else {
        res.redirect('/')
    }
    
}

exports.getResByToken = async (req, res, next) => {
    
    const response = await fetch('http://localhost:8050/api/reservation/allUserRes',{
        headers: {
            'Authorization': localStorage.getItem('token') // Token à récupérer 
        }
    });
    const response1 = await fetch('http://localhost:8050/api/cars/allcar/');
    const myJson = await response.json();
   
    const myJson1 = await response1.json();
    req.allRes = myJson;
    allCars = myJson1;
    if (myJson.length <= 1) {
        myJson[0].dateDepart =  myJson[0].dateDepart.slice(8, 10) + "/" + myJson[0].dateDepart.slice(5, 7) + "/" + myJson[0].dateDepart.slice(0, 4) + " à " + myJson[0].dateDepart.slice(11, 16)
        myJson[0].dateRetour = myJson[0].dateRetour.slice(8, 10) + "/" + myJson[0].dateRetour.slice(5, 7) + "/" + myJson[0].dateRetour.slice(0, 4) + " à " + myJson[0].dateRetour.slice(11, 16)
    } else {
    myJson.map( (e) => {
        e.dateDepart =  e.dateDepart.slice(8, 10) + "/" + e.dateDepart.slice(5, 7) + "/" + e.dateDepart.slice(0, 4) + " à " + e.dateDepart.slice(11, 16)
        e.dateRetour = e.dateRetour.slice(8, 10) + "/" + e.dateRetour.slice(5, 7) + "/" + e.dateRetour.slice(0, 4) + " à " + e.dateRetour.slice(11, 16)
        })  
    }
    return next();
}

exports.getResById = async (req, res) => {
    
    if (req.admin.id){

    const response = await fetch('http://localhost:8050/api/reservation/me/?id='+req.query.id); // Id à récupérer en params
    const response1 = await fetch('http://localhost:8050/api/cars/allcar/');
    const response2 = await fetch('http://localhost:8050/api/users/allUsers');
    const myJson = await response.json();
    myJson.dateDepart =  myJson.dateDepart.slice(8, 10) + "/" + myJson.dateDepart.slice(5, 7) + "/" + myJson.dateDepart.slice(0, 4) + " à " + myJson.dateDepart.slice(11, 16)
    myJson.dateRetour = myJson.dateRetour.slice(8, 10) + "/" + myJson.dateRetour.slice(5, 7) + "/" + myJson.dateRetour.slice(0, 4) + " à " + myJson.dateRetour.slice(11, 16)    
    const myJson1 = await response1.json();
    const myJson2 = await response2.json();

    return res.render('pages/admin/showResById', {
        data : myJson, 
        admin : req.admin,
        getAllCar : myJson1,
        Users: myJson2
    });
    } else {
        res.redirect('/')
    }
    
}

exports.addRes = async (req, res) => {

    if (req.user) {

    fetch("http://localhost:8050/api/reservation/?id='+req.query.id", {

      
    // Adding method type
    method: "POST",
      
    // Adding body or contents to send
    body: JSON.stringify({
        voitureId: req.body.voitureId,
        utilisateurId: req.user.id,
        dateDepart: req.body.dateDepart,
        dateRetour : req.body.dateRetour,
        adresse: req.body.adresse,
    }),
      
    // Adding headers to the request
    headers: {
        "Content-type": "application/json",
        "Authorization": req.headers['authorization'] // Token à récupérer 
    }
})
  
// Converting to JSON
.then(response => response.json())
  
// Displaying results to console
.then(json => console.log(json))
    

    }

}

exports.updateRes = async (req, res) => {
    
    fetch("http://localhost:8050/api/reservation/update/?id="+req.query.id, {
      
    // Adding method type
    method: "PUT",
      
    // Adding body or contents to send
    body: JSON.stringify({
        dateDepart: req.body.dateDepart,
        dateRetour : req.body.dateRetour,
        adresse: req.body.adresse,
        ville: req.body.ville,
        cp: req.body.cp,
        price: req.body.price
    }),
      
    // Adding headers to the request
    headers: {
        "Content-type": "application/json",
    }
})

.then(response => response.json())
.then(json => console.log(json))

res.redirect('/allRes')
    
}

exports.GetUpdateRes = async (req, res) => {
    const response = await fetch('http://localhost:8050/api/reservation/me/?id='+req.query.id);
    const myJson = await response.json();
    const response1 = await fetch('http://localhost:8050/api/reservation/get/all/byCar/?id=' + myJson.voitureId); // Id à récupérer en params
    const myJson1 = await response1.json();
    var queryDepart = moment(myJson.dateDepart).format('yyyy-MM-DDThh:mm') 
    var queryRetour = moment(myJson.dateRetour).format('yyyy-MM-DDThh:mm')
    if(myJson){
            var dateDepart = moment(myJson.dateDepart).format('X');            
            var dateRetour = moment(myJson.dateRetour).format('X');
        }
    if(myJson1){
        myJson1.map(function(e){
            e.dateDepart = moment(e.dateDepart).format('X');            
            e.dateRetour = moment(e.dateRetour).format('X');
        })}
    const getCar = await fetch('http://localhost:8050/api/cars/me/?id=' + myJson.voitureId);
    const voiture = await getCar.json();

    console.log('-----------', queryRetour, queryDepart)

    res.render('pages/admin/formUpdateRes', {
        data: myJson,
        admin: req.admin,
        reservation : myJson1,
        dateDepart : dateDepart,
        dateRetour : dateRetour,
        voiture: voiture,
        queryDepart: queryDepart,
        queryRetour: queryRetour,
    })
}


exports.updateResUser = async (req, res) => {

if(req.user.id) {
    fetch("http://localhost:8050/api/reservation/updateUser?id="+ req.query.id, {

        // Adding method type
        method: "PUT",

        // Adding body or contents to send
        body: JSON.stringify({
            dateDepart: req.body.dateDepart,
            dateRetour : req.body.dateRetour,
            adresse: req.body.adresse,
            ville: req.body.ville,
            cp: req.body.cp,
            price: req.body.price
        }),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json",
            "Authorization": localStorage.getItem('token') //Token à récupérer
        }
    })
    
    // Converting to JSON
    .then(response => response.json())
    
    // Displaying results to console
    .then(json => console.log(json))

    .then(() => {
        res.redirect('/getProfile');
    })
} else {
    res.redirect('/logUser');
}
    
}

//Routes DELETE Res

exports.deleteRes = async (req, res) => {
    
    const response = await fetch('http://localhost:8050/api/reservation/delete?id='+req.query.id,{
        method: 'DELETE',
    });
    const myJson = await response.json();
    console.log('myjson :', myJson);

    res.redirect('/adShowAllRes')
    
}

exports.deleteResByToken = async (req, res) => {
    
    if (req.user.id){
        const response = await fetch('http://localhost:8050/api/reservation/deleteUser?id='+req.query.id,{
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('token') // Token à récupérer 
            }
        });
        const myJson = await response.json();
        console.log('myjson :', myJson);

        res.redirect('/getProfile');
    } else {
        res.redirect('/logUser');
    }
}
