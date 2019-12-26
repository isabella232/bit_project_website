
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const volunteerRouter = require('./routers/volunteers')
const adminRouter = require('./routers/admin')
const eventRouter = require('./routers/event')
const applicantsRouter = require('./routers/applicants')
const appRouter = require('./routers/app')
const hbs = require('hbs')
const app = express()
// const config = require('config') // TODO: check
const port = process.env.PORT || 3000

// Paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, 'templates/views')

// Configure views
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Set up static directory to Server
app.use(express.static(publicDirectoryPath))

// auto parses json
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// use modules
// app.use(express.static('./public', config.static)) // TODO: also check this
app.use(volunteerRouter) // register router with express
// app.use(adminRouter) // only for web dev
app.use(eventRouter)
app.use(applicantsRouter)
app.use(appRouter)


app.listen(port, () => {
    console.log('Server is up on port', port);
})