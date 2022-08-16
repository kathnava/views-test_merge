// IMPORT //
const express = require('express');
const route = express.Router();
const homeCtrl = require('../controlers/homeCtrl');
const carControler = require('../controlers/carCtrl');
const resCtrl = require('../controlers/resCtrl');
const userCtrl = require('../controlers/userCtrl');
const adminCtrl = require('../controlers/admin');

// HOME //
route.get('/', adminCtrl.adminApiVerify,userCtrl.getUserByToken,homeCtrl.view)

// ROUTES //
    // GET //
    route.get('/ResByToken',resCtrl.getResByToken);
    route.get('/ResById',adminCtrl.adminApiVerify,resCtrl.getResById);
    route.get('/getHomeReservation', resCtrl.getResByToken)

    // POST //
    route.post('/reservation',userCtrl.getUserByToken, resCtrl.addRes); 
    route.post('/homeSearchCar',userCtrl.getUserByToken, homeCtrl.resultCarView)

    // PUT //
    route.post('/updateRes', resCtrl.updateRes);
    route.get('/GetUpdateRes',adminCtrl.adminApiVerify,resCtrl.GetUpdateRes);

    route.put('/updateResUser',userCtrl.getUserByToken, resCtrl.updateResUser);

    // DELETE //
    route.delete('/deleteRes',adminCtrl.adminApiVerify,resCtrl.deleteRes);
    route.get('/deleteRes',adminCtrl.adminApiVerify,resCtrl.deleteRes);
    route.delete('/deleteResUser',resCtrl.deleteResByToken);

// EXPORT //
module.exports = route;