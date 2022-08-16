// IMPORT //
const express = require('express');
const route = express.Router();
const adminCtrl = require('../controlers/admin');
const resCtrl = require('../controlers/resctrl');
const carCtrl = require('../controlers/carCtrl');
const userCtrl = require('../controlers/userCtrl');

// ROUTES //
    // GET //
        // AUTH //
        route.get('/adlogout', adminCtrl.adlogout);
        route.get('/logAdmin',adminCtrl.adminApiVerify, adminCtrl.getLogAdmin);

    // ADMIN RES
    route.get('/adShowAllRes', adminCtrl.adminApiVerify,resCtrl.getAllRes);
    route.get('/adShowRes', adminCtrl.adminApiVerify, resCtrl.getResById);
    
        // ADMIN FUNCT //
        route.get('/updateCar', adminCtrl.adminApiVerify, adminCtrl.adminShowCarsId);

    //ADMIN INTERFACE
    route.get('/logAdmin' , adminCtrl.getLogAdmin);
    route.get('/regAdmin' ,adminCtrl.adminApiVerify, adminCtrl.getRegAdmin);
    route.get('/getAdProfile', adminCtrl.adminApiVerify, adminCtrl.getAdProfile );
    route.get('/adlogout', adminCtrl.adlogout);
    route.post('/logAdmin' ,adminCtrl.adminLogin);

    //ADMIN USERS CONTROL
    route.get('/allUsers', adminCtrl.adminApiVerify, userCtrl.getAllUsers);
    route.get('/deleteUserId',adminCtrl.adminApiVerify, userCtrl.deleteUserById);
    route.delete('/deleteUserId',adminCtrl.adminApiVerify, userCtrl.deleteUserById);
    
    
    // ADMIN CAR
    route.get('/getUpdateCar', adminCtrl.adminApiVerify, adminCtrl.adminShowCarsId);
    route.post('/updateCar', carCtrl.updateCar);
    route.get('/adShowCars',adminCtrl.adminApiVerify, adminCtrl.adminShowCars);
    



    // ADMIN CRUD
    route.post('/adminRegister', adminCtrl.adminApiRegister);
    route.post('/adminLogin',adminCtrl.adminApiVerify, adminCtrl.adminLogin);
    route.put('/adminUpdate', adminCtrl.adminApiUpdate);
    route.delete('/adminDelete', adminCtrl.adminDelete);



// EXPORT //
module.exports = route;