// IMPORT & VARIABLES//
const fetch = require('node-fetch');
const LocalStorage = require('node-localstorage').LocalStorage;

var localStorage = new LocalStorage('./scratch');

// ADMIN VIEWS CONTROLS //

exports.adminApiRegister = async (req, res) => {
        // POST request using fetch()
    fetch("http://localhost:8050/api/register/admin", {
          
        // Adding method type
        method: "POST",
          
        // Adding body or contents to send
        body: JSON.stringify({
            username : req.body.username,
            password1 : req.body.password1,
            password2 : req.body.password2,
        }),
          
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
      
    // Converting to JSON
    .then(response => response.json())
      
    // Displaying results to console
    .then(json => console.log(json))

    res.redirect('/getAdProfile')

      
}

exports.adminLogin = async (req, res) => {

    // POST request using fetch()
    await fetch("http://localhost:8050/api/login/admin", {
      
    method: "POST",

    body: JSON.stringify({
        username : req.body.username,
        password : req.body.password,
    }),
      
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
  
// Converting to JSON
.then(response => response.json())
  
// Displaying results to console
.then(json => {
    
    localStorage.setItem('adtoken', json.token);
    })
    
    res.redirect('/getAdProfile')
}

exports.adlogout = async (req, res) => {
    var token = localStorage.getItem('adtoken');
    console.log('token à supp', token);
    if (token) {
        localStorage.removeItem('adtoken');
        res.redirect('/')
    } else {
        res.redirect('/')
    }
}

exports.adminApiVerify = async (req, res, next) => {

    const response = await fetch("http://localhost:8050/api/verify/admin", {
      
    headers: {
        'Authorization': localStorage.getItem('adtoken')
        }
    })
    const myJson = await response.json();
    console.log('myJson admin', myJson )
    req.admin = myJson
    return next()

}

exports.getLogAdmin = async (req, res) => {
    res.render('../views/pages/admin/logAdmin', {admin : req.admin})
}

exports.getRegAdmin = async (req, res) => {
    if(req.admin.id){
        res.render('pages/admin/registerAdmin', {admin:req.admin})
    } else {
        res.redirect('/')
    }
}

exports.getAdProfile = async (req, res, next) => {
    if (req.admin.id) {
        res.render('../views/pages/admin/admin', {admin : req.admin});
    } else {
        res.redirect('/logAdmin');
    }
}

exports.adminApiUpdate = async (req, res) => {

    // POST request using fetch()
    fetch("http://localhost:8050/api/update/admin", {
      
    // Adding method type
    method: "PUT",

    // Adding body or contents to send
    body: JSON.stringify({
        username : req.body.username,
        password : req.body.password,
    }),
      
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
  
// Converting to JSON
.then(response => response.json())
  
// Displaying results to console
.then(json => console.log(json))
  
}

exports.adminDelete = async (req, res) => {

        // POST request using fetch()
        fetch("http://localhost:8050/api/delete/admin/?id="+req.query.id, {
        
        // Adding method type
        method: "DELETE"

    })
  
    // Converting to JSON
    .then(response => response.json())
    
    // Displaying results to console
    .then(json => console.log(json))
    
}

exports.adminShowCars = async (req, res) => {

    const response = await fetch('http://localhost:8050/api/cars/allcar/');
    const myJson = await response.json();

    if (req.admin.id){
        return res.render('pages/admin/Cars/showCars', {getAllCars : myJson, admin : req.admin});
    } else {
        res.redirect('/')
    }
}

exports.adminShowUsers = async (req, res) => {
    const response = await fetch('http://localhost:8050/api/users/allUsers/');
    const myJson = await response.json();
    console.log('myjson admin 2:', myJson);


    if (req.admin.id){
        return res.render('pages/admin/showUsers', {getAllUsers : myJson, admin : req.admin});
    } else {
        res.redirect('/')
    }
}

exports.adminShowCarsId = async (req, res) => {

    const response = await fetch('http://localhost:8050/api/cars/me/?id='+ req.query.id);
    const myJson = await response.json();

    if (req.admin.id){
        return res.render('pages/admin/Cars/formUpdateCar', {updateCar : myJson, admin : req.admin});
    } else {
        res.redirect('/')
    }
}
