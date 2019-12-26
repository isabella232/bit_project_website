
const express = require('express')
const bodyParser = require('body-parser')
const Volunteer = require('./models/volunteers')
const volunteerRouter = require('./routers/volunteers')
const adminRouter = require('./routers/admin')
const eventRouter = require('./routers/event')
const applicantsRouter = require('./routers/applicants')
const appRouter = require('./routers/app')
const app = express()
// const config = require('config') // TODO: check
const port = process.env.PORT || 3000

// auto parses json
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// use modules
// app.use(express.static('./public', config.static)) /// TODO: also check this
app.use(volunteerRouter) // register router with express
// app.use(adminRouter) // only for web dev
app.use(eventRouter)
app.use(applicantsRouter)
app.use(appRouter)


app.listen(port, () => {
    console.log('Server is up on port', port);
})