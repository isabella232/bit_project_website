
const express = require('express')
require('../db/mongoose')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO: DO WE USE THIS page
// REST APIs

// Add Volunteer
router.post('/volunteers', async (req, res) => {
	console.log(req.body)
	const volunteer = new User(req.body)
	console.log(volunteer)
	try {
		await volunteer.save()
		res.status(201).redirect("Login.html")
	} catch (e) {
		console.log(e);
		res.status(400).send(e)
	}
})

// Read ALL Volunteers
router.get('/volunteers', async (req, res) => {
	try {
		const volunteers = await User.find({})
		res.send(volunteers)
	} catch (e) {
		res.status(500).send()
	}
})

// Login Page for Volunteers
router.post('/volunteers/login', async (req, res) => {
	console.log("Login!")
	try {
		const volunteer = await User.findByCredentials(req.body.email, req.body.password)
		const token = await volunteer.generateAuthToken()
		res.cookie('auth', 'Bearer ' + token, { httpOnly: true })
		console.log('cookies are:')
		console.log(res.cookies)
		res.redirect('/profile')
	} catch (e) {
		console.log('error')
		console.log(e)
		res.status(400).send()
	}
})

// Logout page for volunteers
router.get('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.status(201).redirect("/home")
    } catch (e) {
		console.log(e)
        res.status(500).send()
    }
})

// Update Volunteer
router.patch('/volunteers/:id', async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['firstName', 'lastName', 'age', 'email', 'password', 'eventCount']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid update' })
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


router.get('/volunteers/profile', auth, async (req, res) => { 
	console.log("profile")
	console.log(req.cookies)
	res.render('profile',
	{
		profile: "profile",
		profileLink: "/profile"
	})
})

// Read a single volunteer (login a person) by cross checking email/password
router.get('/volunteers/:email', async (req, res) => {

	try {
		const email = req.params
		const volunteers = await Volunteer.findOne(email)

		// if not found return 404 error
		if (!volunteers) {
			return res.status(404).send()
		}

		// if found send user
		res.send(user)
		//send 500 error if error
	} catch (e) {
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
	} catch (e) {
		res.status(500).send()
	}
})


// Export Volunteer router
module.exports = router