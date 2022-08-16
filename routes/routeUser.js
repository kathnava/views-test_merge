// IMPORT //
const express = require('express');
const route = express.Router();
const carControler = require('../controlers/carCtrl');
const userCtrl = require('../controlers/userCtrl');
const resCtrl = require('../controlers/resctrl');
const multer = require('multer');

// MULTER //
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
    // GET //
    route.get('/getProfile', userCtrl.getUserByToken, resCtrl.getResByToken, userCtrl.getProfile );
    route.get('/userById', userCtrl.getUserById);
    route.get('/registerUser', userCtrl.getUserByToken, userCtrl.getAddUser);
    route.get('/logUser', userCtrl.getUserByToken, userCtrl.getLogUser);
    route.get('/updateUser', userCtrl.getUserByToken, userCtrl.getUpdateUser);
    route.get('/updateResUser', userCtrl.getUserByToken, userCtrl.getUpdateResUser);

    route.get('/allcar', userCtrl.getUserByToken,carControler.getAllCar);
    
    route.get('/contact', userCtrl.getUserByToken, userCtrl.getContact);
    route.get('/logout', userCtrl.logout);

    // POST //
    route.post('/registerUser', userCtrl.addUser);
    route.post('/logUser', userCtrl.logUser);
    route.post('/updateResUser', userCtrl.getUserByToken , resCtrl.updateResUser)
    
    // PUT //
    route.post('/updateUser',userCtrl.getUserByToken, userCtrl.updateUser);

    // DELETE //
    route.delete('/deleteUser', userCtrl.deleteUserByToken);
    route.get('/deleteUser', userCtrl.deleteUserByToken);
    route.delete('/deleteUserId', userCtrl.deleteUserById);

    route.get('/deleteResUser', userCtrl.getUserByToken, resCtrl.deleteResByToken);
    route.delete('/deleteResUser', userCtrl.getUserByToken, resCtrl.deleteResByToken);

// EXPORT //
module.exports = route;