
const express = require('express')
require('../db/mongoose')
const Volunteer = require('../models/volunteers')
const router = new express.Router()

app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// REST APIs
// Add Volunteer

router.post('/volunteers', async (req, res) =>{
	console.log(req.body);
	const volunteer = new Volunteer(req.body)
	
    try { 
    	await volunteer.save()
    	res.status(201).redirect("Login.html")
    } catch(e) {
		console.log(e);
        res.status(400).send(e)
    }
})

// Read ALL volunteers
router.get('/volunteers', async (req, res) => { 
	try { 
		const volunteers = await Volunteer.find({})
		res.send(volunteers)
	} catch (e) { 
		res.status(500).send()
	}
})

// Read a single volunteer (login a person) by cross checking email/password
router.get('/volunteers/:email', async (req, res) => { 

	try { 
		const email = req.params
		console.log(email);
		const volunteers = await Volunteer.findOne(email)

		// if not found return 404 error
		if (!volunteer) { 
			return res.status(404).send()
		}

		// if found send user
		res.send(user)
	//send 500 error if error
	} catch(e) { 
		res.status(500).send()
	}
})

// Delete Volunteer
router.delete('/volunteers/:id', async (req, res) => {  
	try {
		// try to delete volunteer, if found store in volunteer 
		const volunteer = await volunteer.findByIdAndDelete(req.params.id)
		const token = await volunteer.generateAuthToken() 
		
		// if not found return 404 error
		if (!volunteer) { 
			return res.status(404).send()
		}

		// if found send user
		res.send(volunteer)
	//send 500 error if error
	} catch(e) { 
		res.status(500).send()
	}
})

router.post('/volunteers/login', async (req, res) => {
	console.log("Login!")	
    try {
		const volunteer = await Volunteer.findByCredentials(req.body.email, req.body.password)
		const token = await volunteer.generateAuthToken() 
        res.status(201).send({volunteer,token})
    } catch (e) {
        res.status(400).send()
    }
})

// Update Volunteer
router.patch('/volunteers/:id', async (req, res) => { 
	const updates = Object.keys(req.body) 
	const allowedUpdates = ['firstName', 'lastName', 'age', 'email', 'password','eventCount']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) { 
		return res.status(400).send({error: 'Invalid update'})
	}

	try { 
		const volunteer = await Volunteer.findById(req.params.id)
        updates.forEach((update) => volunteer[update] = req.body[update])
		await volunteer.save()	
		if (!volunteer) { 
			return res.status(404).send()
		}
		res.send(volunteer)
	} catch (e) {  
		res.status(400).send()
	}
})

// Export Volunteer router
module.exports = router