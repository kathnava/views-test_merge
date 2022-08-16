const fetch = require('node-fetch');
const moment = require('moment');
const LocalStorage = require('node-localstorage').LocalStorage;

var localStorage = new LocalStorage('./scratch');


//Routes GET User
exports.getAllUsers = async (req, res) => {
    
    const response = await fetch('http://localhost:8050/api/users/allUsers');
    const myJson = await response.json();
    console.log('myjson :', myJson);
    console.log('JE SUIS ADMIN',req.admin)

   if (req.admin.id){
    res.render('pages/admin/showUsers', {
        getAllUsers: myJson,
        admin : req.admin,
        })
    }
    else { 
        res.redirect('/')
    }
}

exports.getUserByToken = async (req, res, next) => {
    
    const response = await fetch('http://localhost:8050/api/users/profile/',{
        headers: {
            'Authorization':  localStorage.getItem('token')// Token à récupérer 
        }
     });
    const myJson = await response.json();
    req.user = myJson;
    console.log('User Info', req.user);
    return next();
    
}
exports.getProfile = async (req, res, next) => {
    if (req.user.id && req.allRes) {
        res.render('../views/usersSide/profile', {user : req.user, allRes: req.allRes});
    } else {
        res.redirect('/logUser');
    }
}
exports.getContact = async (req, res) => {
    res.render('../views/usersSide/contact', {user : req.user});
    
}
exports.getUserById = async (req, res) => {
    
    const response = await fetch('http://localhost:8050/api/users/profileById/?id='+req.query.id); // Id à récupérer en params
    const myJson = await response.json();
    console.log('myjson :', myJson);
    
}
exports.getAddUser = async (req, res) => {
    res.render('../views/usersSide/inscription', {user : req.user});
}
exports.getLogUser = async (req, res) => {
    res.render('../views/usersSide/login', {user : req.user});
}

//Routes POST User
exports.addUser = async (req, res) => {
    

    fetch("http://localhost:8050/api/users/register/", {
      
    // Adding method type
    method: "POST",
      
    // Adding body or contents to send
    body: JSON.stringify({
        nom : req.body.nom,
        prenom : req.body.prenom,
        telephone : req.body.telephone,
        email : req.body.email,
        password  : req.body.password,
        mailcontact : req.body.mailcontact,
        telcontact : req.body.telcontact,
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

res.redirect('/logUser');
    
}
exports.logUser = async (req, res, next) => {

    await fetch("http://localhost:8050/api/users/login/", {

        // Adding method type
        method: "POST",

        // Adding headers to the request
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
          
        // Adding body or contents to send
        body: JSON.stringify({
            email : req.body.email,
            password  : req.body.password,
        }),

    })
  
// Converting to JSON
.then((res) => {  
    return res.json() 
  })
  
// Displaying results to console
.then(json => {
    
    localStorage.setItem('token', json.token);
    console.log(localStorage.getItem('token'));
    })

.catch((err) => {
    console.error(err);
})

res.redirect('/getProfile')
}

exports.logout = async (req, res) => {
    var token = localStorage.getItem('token');
    console.log('token à supp', token);
    if (token) {
        localStorage.removeItem('token');
        res.redirect('/logUser')
    }
}

//Routes PUT User
exports.getUpdateUser = async (req, res) => {
    if (req.user.id) {
        res.render('../views/usersSide/updateUser', { user : req.user });
    } else {
        res.redirect('/logUser');
    }
}
exports.updateUser = async (req, res) => {
    
    fetch("http://localhost:8050/api/users/updateProfile", {
      
    // Adding method type
    method: "PUT",
      
    // Adding body or contents to send
    body: JSON.stringify({
        nom : req.body.nom,
        prenom : req.body.prenom,
        telephone : req.body.telephone,
        email : req.body.email,
        password  : req.body.password,
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
    
}

//Routes DELETE User
exports.deleteUserByToken = async (req, res) => {
    
    const response = await fetch('http://localhost:8050/api/users/deleteUser/',{
        method: 'DELETE',
        headers: {
            'Authorization': localStorage.getItem('token') // Token à récupérer 
        }
    });
    const myJson = await response.json();
    console.log('myjson :', myJson);
    res.redirect('/');
    
    
}
exports.deleteUserById = async (req, res) => {
    
    const response = await fetch('http://localhost:8050/api/users/deleteUserProfile/?id='+req.query.id, // Id à récupérer en params
    { method: 'DELETE'}
    );
    const myJson = await response.json();
    console.log('myjson :', myJson);

    res.redirect('/allUsers');
    
}

exports.getUpdateResUser = async (req, res) => {

    // Réservation à modifier
    const response = await fetch('http://localhost:8050/api/reservation/me/?id='+req.query.id); // Id à récupérer en params
    const resToUpdate = await response.json();
    console.log('res à update', resToUpdate);

    // Formatage des dates pour l'affichage
    var queryDepart = moment(resToUpdate.dateDepart).format('yyyy-MM-DDThh:mm') 
    var queryRetour = moment(resToUpdate.dateRetour).format('yyyy-MM-DDThh:mm')

    //Les réservations liées à la voiture
    const response1 = await fetch('http://localhost:8050/api/reservation/get/all/byCar/?id=' + resToUpdate.voitureId); // Id à récupérer en params
    const car = await response1.json();

    //Formatage des dates pour le script
    if(resToUpdate){
        var dateDepart = moment(resToUpdate.dateDepart).format('X');            
        var dateRetour = moment(resToUpdate.dateRetour).format('X');
    }

    //Mappage des résa par rapport à la voiture
    if(car){
    car.map(function(e){
        e.dateDepart = moment(e.dateDepart).format('X');            
        e.dateRetour = moment(e.dateRetour).format('X');
    })}

    // La voiture de la résa
    const getCar = await fetch('http://localhost:8050/api/cars/me/?id=' + resToUpdate.voitureId);
    const voiture = await getCar.json();
    
    if(req.user.id) {
        res.render('../views/usersSide/updateResUser', { 
            user : req.user,
            res : resToUpdate,
            queryDepart: queryDepart,
            queryRetour: queryRetour,
            reservation : car,
            dateDepart : dateDepart,
            dateRetour : dateRetour,
            voiture : voiture
        })
    } else {
        res.redirect('/logUser');
    }
}