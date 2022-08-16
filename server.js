// CONST //

const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');



// DIRECTORY //

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static('utils'))
app.use(express.json());


// PATH //


const pubDirect = path.join(__dirname, './public')

// ROUTES //
app.use('/', require('./routes/routeReservation'));
app.use('/', require('./routes/routeCar'));
app.use('/', require('./routes/routeUser'));
app.use('/', require('./routes/admin'));
app.use('/', require('./routes/home'));

// SET //

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// PORT //

app.listen(8000);