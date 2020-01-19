require('dotenv').config({ path: './.env' });
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
//const adminRouter = require('./routers/admin')
const volunteerRouter = require('./routers/volunteers')
const eventRouter = require('./routers/event')
const pusherRouter = require('./routers/chatroom')
const appRouter = require('./routers/app')
const app = express()
const port = process.env.PORT || 3000
const hbs = require('hbs')
const cors = require('cors');


// Paths
const publicDirectoryPath = path.join(__dirname, 'templates/public')
const viewsPath = path.join(__dirname, 'templates/views')

const partialsPath = path.join(__dirname, 'templates/partials') 
hbs.registerPartials(partialsPath)
// Configure views
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Set up static directory to Server
app.use(express.static(publicDirectoryPath))

app.use(cors());

// auto parses json
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// use modules
// app.use(adminRouter) // only for web dev
app.use(volunteerRouter)
app.use(eventRouter)
app.use(appRouter)
app.use(pusherRouter)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const Chatkit = require('@pusher/chatkit-server');

const chatkit = new Chatkit.default({
    instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
    key: process.env.CHATKIT_SECRET_KEY,
});

app.post('/users', (req, res) => {
    const { userId } = req.body;
    chatkit
      .createUser({
        id: userId,
        name: userId,
      })
      .then(() => {
        res.sendStatus(201);
      })
      .catch(err => {
        if (err.error === 'services/chatkit/user_already_exists') {
          console.log(`User already exists: ${userId}`);
          res.sendStatus(200);
        } else {
          res.status(err.status).json(err);
        }
    });
});

/* while /authenticate validates all incoming connections to our Chatkit instance by responding with a token (returned by chatkit.
authenticate) if the request is valid. For the purpose of this tutorial, 
we don’t actually try to validate the request before returning the token, 
but you need to do so in your production code. */

app.post('/authenticate', (req, res) => {
    const authData = chatkit.authenticate({
      userId: req.query.user_id,
    });
    res.status(authData.status).send(authData.body);
});

app.listen(port, () => {
    console.log('Server is up on port', port);
})

const bcrypt = require('bcryptjs')