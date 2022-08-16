// CONSTANTES //
const express = require('express');
const route = express.Router();
const multer = require('multer');
const resCtrl = require('../controlers/resCtrl');
const userCtrl = require('../controlers/userCtrl');

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/img/');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})
    var upload = multer({ storage: storage });

// ROUTES //

route.get('/confirmReservation',userCtrl.getUserByToken, resCtrl.confirmReservation);
route.post('/createReservation',userCtrl.getUserByToken, resCtrl.createReservation);

// EXPORT //
module.exports = route;