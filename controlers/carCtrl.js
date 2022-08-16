// IMPORTS //
const fetch = require('node-fetch');


// FUNCTIONS //
exports.getCar = async (req, res) => {
    console.log(req.query.id)
    const response = await fetch('http://localhost:8050/api/cars/me/?id='+req.query.id);
    const myJson = await response.json();
    console.log('get car :', myJson); 

    return res.render('pages/admin/Cars/getAdCar', {
        getCar: myJson,
        admin : req.admin,
    });

}

exports.AdgetAllCar = async (req, res) => {
    
    
    const response = await fetch('http://localhost:8050/api/cars/allcar/');   
    const myJson = await response.json();
    allcar = myJson
   
    if (req.admin.id){
        return res.render('pages/admin/Cars/showCars', {
            getallCars: allcar,
            admin : req.admin,
        });
    } else {
        res.redirect('/')
    }

}

exports.addCar = async (req, res) => {

   
    // POST request using fetch()
    fetch("http://localhost:8050/api/cars", {
      
    // Adding method type
    method: "POST",
      
    // Adding body or contents to send
    body: JSON.stringify({
        attachment : req.file.originalname,
        marque : req.body.marque,
        immat : req.body.immat,
        carburant : req.body.carburant,
        am : req.body.am,
        pxDD  : req.body.pxDD,
        pxLV : req.body.pxLV,
        pxWE : req.body.pxWE,
        pxWK : req.body.pxWK 
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

res.redirect('/adallcar')
  
}

exports.updateCar = async (req, res) => {

 
await fetch("http://localhost:8050/api/cars/update/?id="+req.query.id,{
      
    // Adding method type
    method: "PUT",
      
    // Adding body or contents to send
    body: JSON.stringify({
        attachment: req.attachment,
        marque : req.body.marque,
        immat : req.body.immat,
        carburant : req.body.carburant,
        am : req.body.am,
        pxDD  : req.body.pxDD,
        pxLV : req.body.pxLV,
        pxWE : req.body.pxWE,
        pxWK : req.body.pxWK 
    }),
      
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    }
})
  
// Converting to JSON
.then(response => response.json())
  
// Displaying results to console
.then(json => console.log(json))

res.redirect('/adallcar')
}

exports.deleteCar = async (req, res) => {
    
    const response = await fetch('http://localhost:8050/api/cars/delete/?id='+req.query.id, {
        method: 'DELETE',
      });
    const myJson = await response.json();
    console.log('myjson :', myJson);

    res.redirect('/adallcar')
    
}

exports.viewCars = async (req, res) => {

    const response = await fetch('http://localhost:8050/api/cars/allcar/');
    const myJson = await response.json();
    console.log('myjson :', myJson);

    return res.render('pages/cars/viewAllCars', {allCars : myJson, user : req.user});

}

exports.soloCar = async (req, res) => {
    const response = await fetch('http://localhost:8050/api/cars/me/?id='+req.query.id);
    const myJson = await response.json();
    console.log('myjson :', myJson);
    req.car = myJson

    return res.render('pages/cars/soloCar', {
        soloCar : req.car,
        user : req.user
    });
}

exports.getAllCar = async (req, res) => {
    
    
    const response = await fetch('http://localhost:8050/api/cars/allcar/');
    const myJson = await response.json();
    console.log('myjson :', myJson);

    return res.render('pages/cars/viewAllCars', {
        allCars : myJson,
        user : req.user,
        soloCar: req.car
    });
 
}
