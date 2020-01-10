
const express = require('express')
require('../db/mongoose')
const Event = require('../models/events')
const router = new express.Router()

app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// REST APIs

// Routes to add event
router.post('/events', async (req, res) =>{
    const event = new Event(req.body)
	event.href = "/events/" + event.eventName
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
			res.render('profile',{
				profile: "Profile",
				profileLink: "/profile",
				events: events
			})
		}
		else{
			res.render('profile',{
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
// Added functionality, if url has eventName search parameter, fitlers for that event name
router.get('/event', async (req, res) => { 
	//Create variable to store filter
	var query = {}
	console.log()
	// TODO: Link search bar button to actually retrive it upon searching
	try { 
		console.log(req.query);
		// const event = await Event.findOne({eventName:"Turkey Trot"})
		// if filter is present
		console.log(req.query.eventName);
		if (req.query.eventName) { 
			query.eventName = req.query.eventName
			const events = await Event.find({"eventName":query.eventName})
			console.log(events);
			res.render('events', {
				events: events
			})
		//no filter present
		} else { 
			const events = await Event.find({})
			
			console.log(events);
			res.send(events)
		}
	} catch (e) { 
		res.status(500).send()
	}
})
 
// Delete Event
router.delete('/events/:id', async (req, res) => {  
	try {
		// try to delete Event, if found store in Event 
		const event = await Event.findByIdAndDelete(req.params.id)
		
		// if not found return 404 error
		if (!event) { 
			return res.status(404).send()
		}

		// if found send user
		res.send(event)
	//send 500 error if error
	} catch(e) { 
		res.status(500).send()
	}
})



// TODO: Update Event
router.patch('/events/:id', async (req, res) => { 
	const updates = Object.keys(req.body) 
	const allowedUpdates = ['firstName', 'lastName', 'age', 'email', 'password','eventCount', 'isCoordinator','assignedToEvent']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) { 
		return res.status(400).send({error: 'Invalid update'})
	}


	try { 
		//spot to fix
		const Admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
		//spot to fix findByIdAndUpdate({_id: req.params.id }, req.body, { new: true, runValidators: true})
		if (!Admin) { 
			return res.status(404).send()
		}

		res.send(Admin)
	} catch (e) {  
		res.status(400).send()
	}
})

// Export Admin router
module.exports = router