'use strict';

const express = require('express'); // load express from node_modules
const app = express(); // instanciate express to use its functionality

const PORT = process.env.PORT || 3000; // set a port. Look to environment variable if avaialble

app.use(express.static('./public')); // tell server which directory to serve files from

// Set up a route to send a message
app.get('/', (request, response) => {
    response.json({message: 'This is our response.'});
    console.log('This will show up in Node terminal window');
});

// Set up a route to send a file
app.get('/house', (req, res) => {
    res.sendFile('modelHouse.html', {root: './public'});
})

// Start the app so it listens for changes
app.listen(PORT, () => console.log(`Listening on ${PORT}`));