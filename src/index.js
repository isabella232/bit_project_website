require('dotenv').config({ path: './.env' });
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const volunteerRouter = require('./routers/volunteers')
const adminRouter = require('./routers/admin')
const eventRouter = require('./routers/event')
const pusherRouter = require('./routers/chatroom')
const applicantsRouter = require('./routers/applicants')
const appRouter = require('./routers/app')
const app = express()
const port = process.env.PORT || 3000
const hbs = require('hbs')
const cors = require('cors');
const Chatkit = require('@pusher/chatkit-server');

const chatkit = new Chatkit.default({
    instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
    key: process.env.CHATKIT_SECRET_KEY,
});

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
// app.use(express.static('./public', config.static)) // TODO: also check this
app.use(volunteerRouter) // register router with express
// app.use(adminRouter) // only for web dev
app.use(eventRouter)
app.use(applicantsRouter)
app.use(appRouter)
app.use(pusherRouter)



app.listen(port, () => {
    console.log('Server is up on port', port);
})

const bcrypt = require('bcryptjs')