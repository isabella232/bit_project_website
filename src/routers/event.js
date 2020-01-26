
const express = require('express')
require('../db/mongoose')
const Event = require('../models/events')
const jwt = require('jsonwebtoken') 
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')
app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// REST APIs

// Routes to singular event view
router.get('/events/view', async (req, res) => { 
	try { 
		// Render page if user is logged in
		if ((req.query.eventName) && (req.cookies.auth)) {
			// Get a user if logged in
			const token = req.cookies.auth.replace('Bearer ', '')   
			const decoded = jwt.verify(token, 'thisismysecret')      
		    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
		    // Throw error if no user
		    if (!user) { 
		            res.clearCookie('auth')
		            throw new Error()
		    }
		    //Get event to render page with
			const events = await Event.find({"eventName":req.query.eventName})
			res.render('view', {
				eventName: events[0].eventName,
				month: events[0].month,
				day: events[0].day,
				time: events[0].time,
				description: events[0].description,
				manageHREF: user.manageHREF,
				userMethod: user.userMethod,
				text: user.text,
			})
		} else if (req.query.eventName){
			const events = await Event.find({"eventName":req.query.eventName})
			res.render('view', {
				eventName: events[0].eventName,
				month: events[0].month,
				day: events[0].day,
				time: events[0].time,
				description: events[0].description,
			})
		}
		else { 
			res.status(201).redirect('/events')
		}
	} catch (e) { 
		res.status(500).send(e)
	}
})


// Routes to add event
router.post('/events', async (req, res) =>{
    const event = new Event(req.body)
	event.href = "/events/view?eventName=" + event.eventName
    try { 
    	await event.save()
    	res.status(201).redirect('/events')
    } catch(e) {
        res.status(400).send(e)
	}
}) 

// Routes to Events Browsing Page
router.get('/events', async (req, res) => { 
	try { 
		const events = await Event.find({})
		// Render "events.hbs" with const events
		if(req.cookies.auth){	
			res.render('events',{
				profile: "Profile",
				profileLink: "/profile",
				events: events
			})
		}
		else{
			res.render('events',{
				profile: "Login",
				profileLink: "/login",
				events: events
			})
		}
	} catch (e) { 
		res.status(500).send(e)
	}
})


// Read ALL events
// Added functionality, if url has eventName search parameter, filters for that event name
router.get('/event', async (req, res) => { 
	//Create variable to store filter
	var query = {}
	// TODO: Link search bar button to actually retrive it upon searching
	try { 
		if (req.query.eventName && req.query.findEvent ){
			const events = await Event.find({"eventName":req.query.eventName})
			res.send(events)
		}
		else if (req.query.eventName) { 
			query.eventName = req.query.eventName
			const events = await Event.find({"eventName":query.eventName})
			res.render('events', {
				events: events
			})
		} else { 
			const events = await Event.find({})
			res.send(events)
		}
	} catch (e) { 
		res.status(500).send()
	}
})

//TODO: Manage Volunteers
router.get('/events/manage', auth, async(req,res) => { 
	try { 
		//Render page if user is logged in
		if ((req.cookies.auth) && (req.query.eventName)) { 
			// Get a user if logged in
			const token = req.cookies.auth.replace('Bearer ', '')   
		    const decoded = jwt.verify(token, 'thisismysecret')       
		    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
		    
		    // Throw error if no user
		    if (!user) { 
		            res.clearCookie('auth')
		            throw new Error()
		    }

		    //Get event to render page with
			const event = await Event.find({"eventName":req.query.eventName})
			// Render manage volunteers page
			if (user[0].userType == 'coordinator') { 
				res.render('manage', {
					eventName: events[0].eventName,
					month: events[0].month,
					day: events[0].day,
					time: events[0].time,
					description: events[0].description
					//users: events[0].users
				})
			} else {
				res.status(500).send()
			}
		// Not logged in send to login page
		} else { 
			res.redirect('../login')
		}
	} catch (e) { 
		res.status(500).send(e)
	}
})

  

//TODO: associate an event and a user using signup button
router.post('/events/addevent', auth, async(req,res) => {
	try { 
		//Render page if user is logged in
		if ((req.cookies.auth) && (req.body.eventName)) {
			// Get a user if logged in
			const token = req.cookies.auth.replace('Bearer ', '')   
		    const decoded = jwt.verify(token, 'thisismysecret')       
		    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
			const accountSid = 'AC641dbcb14c529a059517bd8948ef128f';
			const authToken = 'cda892d861df16ec203cbcb265f25569';
			const client = require('twilio')(accountSid, authToken);
			console.log("addevent")
			client.messages
				.create({
					body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
					from: '+19713404426',
					to: '+5307609164'
				})
				.then(message => console.log(message.sid));

		    // Throw error if no user
			if (!user) { 
		            res.clearCookie('auth')
		            throw new Error()
		    }

			// Check that user is of volunteer type
			if (user.userType == 'volunteer') {
				// Update event
				const event = await Event.findOne({"eventName":req.body.eventName})
				event.pendingVolunteers.push(user)
				const newEvent = await event.save()

				// Update user
				//const user = await User.findOneAndUpdate()
				console.log("volunteer")
				res.render('events',{
					profile: "Profile",
					profileLink: "/profile",
					events: events
				})
			} else {
				res.status(500).send()
			}
		// Not logged in, send to login page
		} else { 
			res.redirect('../login')
		}
	} catch (e) { 
		res.status(500).send(e)
	}
})

// get pending volunteers for a given event
router.get('/events/getPending/:eventName', auth, async(req, res) => {
	const event = await Event.findOne({"eventName": req.params.eventName})

	const pendingIds = event.pendingVolunteers
	for (var i = 0; i < pendingIds.length(); i++) {
		var user = User.findOne(pendingIds[i])
		var name = user.firstName + ' ' + user.lastName
		names.push(name)
	}
	return names
})

//Commmented the below out because we're not using them and they don't seem to work anyways

// TODO: Update Event
// router.patch('/events/:id', async (req, res) => { 
// 	const updates = Object.keys(req.body) 
// 	const allowedUpdates = ['firstName', 'lastName', 'age', 'email', 'password','eventCount', 'isCoordinator','assignedToEvent']
// 	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

// 	if (!isValidOperation) { 
// 		return res.status(400).send({error: 'Invalid update'})
// 	}

// 	try { 
// 		//spot to fix
// 		const Admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
// 		//spot to fix findByIdAndUpdate({_id: req.params.id }, req.body, { new: true, runValidators: true})
// 		if (!Admin) { 
// 			return res.status(404).send()
// 		}

// 		res.send(Admin)
// 	} catch (e) {  
// 		res.status(400).send()
// 	}
// })

// TODO: Read SINGLE event
// Silenced because it was being used before /events/:eventName
// router.get('/event/:id', async (req, res) => { 
//     const _id = req.params.id

//     console.log(_id)
// 	try {
// 		const event = await Event.findById(_id)

// 		// if not found return 404 error
// 		if (!event) { 
// 			return res.status(404).send()
// 		}

// 		// if found send user
// 		res.send(event)
// 	//send 500 error if error
// 	} catch(e) { 
// 		res.status(500).send(e)
// 	}
// })
 
// TODO: Delete Event
// router.delete('/events/:id', async (req, res) => {  
// 	try {
// 		const _id = "5e15245a5df7d716144a41c7"
// 		//const _id = req.params.id.
// 		console.log(req.params.id)
// 		console.log(_id)
// 		// try to delete Event, if found store in Event 
// 		const event = await Event.findByIdAndDelete(_id)
// 		console.log(event)
// 		// if not found return 404 error
// 		if (!event) { 
// 			return res.status(404).send()
// 		}

// 		// if found send user
// 		res.send(event)
// 	//send 500 error if error
// 	} catch(e) { 
// 		res.status(500).send()
// 	}
// })


// Export Admin router
module.exports = router