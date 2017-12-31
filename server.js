'use strict';

const express = require('express'); // load express from node_modules
const app = express(); // instanciate express to use its functionality

const PORT = process.env.PORT || 3000; // set a port. Look to environment variable if avaialble
const TOKEN = process.env.TOKEN; // super secret admin password
const APIKEY = process.env.APIKEY; // 3rd party API Key
app.use(express.static('./public')); // tell server which directory to serve files from

var router = express.Router(); // get an instance of the express Router

/// if were using a posgres database
// const pg = require('pg'); // postgress database
// const client = new pg.Client(process.env.DATABASE_URL);
// client.connect();
// client.on('error', err => console.error(err));

 //if we're connecting to firebase database
// var firebase = require("firebase"); 
const firebase = require("firebase-admin");
const db = firebase.database().ref('houseapidemo');
const serviceAccount = require("service-account.json");
// firebase.initializeApp(functions.config().firebase);
firebase.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://houseapidemo.firebaseio.com"
});



/// if were connecting to the outside world
app.use(cors());



/* Routes
************************************************************************************************ 
*/

// Set up a route to send a message
app.get('/', (request, response) => {
    response.json({message: 'This is our response.'});
    console.log('This will show up in Node terminal window');
});

// Set up a route to send a file
app.get('/house', (request, response) => {
    response.sendFile('modelHouse.html', {root: './public'});
})

// View all houses
app.get('/houses', (request, response) => {
    response.json({message: 'All houses here'});
})

// add to firebase db
app.post('/house/new', (request, response) => {
    let item = {name, address, floors, color, garage, rooms} = request.body;
    db.push(item); // submit items
    response.message(`thank you for your response. ${item.name} has been added`);

})
// add to a posgress db
app.post('/tasks/add', bodyParser, (req, res) => {
    let {title, description, category, contact, status} = req.body;
  
    client.query(`
        INSERT INTO tasks(title, description, category, contact, status)
        VALUES ($1, $2, $3, $4, $5)`,
        [title, description, category, contact, status]
    )    
    .then(results => res.sendStatus(201))
    .catch(console.error);
});

// admin route
app.get('/admin', (req, res) => res.send(TOKEN === parseInt(req.query.token)))


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
// app.use('/api', router);

// Start the app so it listens for changes
app.listen(PORT, () => console.log(`Listening on ${PORT}`));