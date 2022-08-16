// IMPORT //
const express = require('express');
const route = express.Router();
const carControler = require('../controlers/carCtrl');
const userCtrl = require('../controlers/userCtrl');
const adminCtrl = require('../controlers/admin');
const multer = require('multer');

// MULTER
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/img/');
    },
    filename: function(req, file, callback)  {
        callback(null, file.originalname);
    }
})
var upload = multer({ storage: storage });

// ROUTES GET
route.get('/car', adminCtrl.adminApiVerify,carControler.getCar);
route.get('/adallcar',adminCtrl.adminApiVerify, carControler.AdgetAllCar);

route.get('/getaddcar', adminCtrl.adminApiVerify,(req, res) => {

    if (req.admin.id) {
        res.render('pages/admin/Cars/formAddCar',{admin : req.admin})
    } else {
        res.redirect('/')
    }
});

route.get('/viewCars', userCtrl.getUserByToken, carControler.soloCar, carControler.getAllCar);
route.get('/soloCar', carControler.soloCar);

// ROUTES POST
route.post('/addcar',upload.single('attachment'), carControler.addCar);




//ROUTES DELETE
route.delete('/deleteCar', adminCtrl.adminApiVerify, carControler.deleteCar);
route.get('/deleteCar', adminCtrl.adminApiVerify, carControler.deleteCar);




module.exports = route