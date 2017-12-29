'use strict';

const express = require('express'); // load express from node_modules
const app = express(); // instanciate express to use its functionality

const PORT = process.env.PORT || 3000; // set a port. Look to environment variable if avaialble

app.use(express.static('./public')); // tell server which directory to serve files from

// Set up a route to send a message
app.get('/', (request, response) => {
    response.send('<h1>This will show up in the browser</h1>');
    console.log('This will show up in Node terminal window');
});

// Start the app so it listens for changes
app.listen(PORT, () => console.log(`Listening on ${PORT}`));