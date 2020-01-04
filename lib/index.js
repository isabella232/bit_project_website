"use strict";

var express = require('express');

var path = require('path');

var bodyParser = require('body-parser');

var volunteerRouter = require('./routers/volunteers');

var adminRouter = require('./routers/admin');

var eventRouter = require('./routers/event');

var applicantsRouter = require('./routers/applicants');

var appRouter = require('./routers/app');

var hbs = require('hbs');

var app = express(); // const config = require('config') // TODO: check

var port = process.env.PORT || 3000; // Paths

var publicDirectoryPath = path.join(__dirname, 'templates/public');
var viewsPath = path.join(__dirname, 'templates/views'); // Configure views

app.set('view engine', 'hbs');
app.set('views', viewsPath); // Set up static directory to Server

app.use(express["static"](publicDirectoryPath)); // auto parses json

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); // use modules
// app.use(express.static('./public', config.static)) // TODO: also check this

app.use(volunteerRouter); // register router with express
// app.use(adminRouter) // only for web dev

app.use(eventRouter);
app.use(applicantsRouter);
app.use(appRouter);
app.listen(port, function () {
  console.log('Server is up on port', port);
});

var bcrypt = require('bcryptjs');