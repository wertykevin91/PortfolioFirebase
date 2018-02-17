const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate');

// get apps

const app = express();

app.engine('pug', engines.pug);
app.set('views', './views');
app.set('view engine', 'pug');

// routes
var home = require('./routes/index');

// app.get("/timestamp", (request, response)=>{

//     response.send(`${Date.now()}`);
// });

// app.get("/timestamp-cached", (request, response)=>{
//     response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
//     response.send(`${Date.now()}`);
// });
app.use('/', home);

// export app
exports.app = functions.https.onRequest(app);
