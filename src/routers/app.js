const path = require('path')
const express = require('express');
require('../db/mongoose')
const Event = require('../models/events')
const hbs = require('hbs')
const router = express();

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const publicDirectoryPath = path.join(__dirname, '../../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

console.log(publicDirectoryPath);
console.log(viewsPath);
console.log(partialsPath);


router.set('view engine', 'hbs')
router.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
router.use(express.static(publicDirectoryPath))

router.get('', (req, res) => {
	router.render('index')
})

router.get('/turkey-trot', async (req, res) => {
	const eventName = req.params

	try {
		const event = await Event.findOne({eventName:"Turkey Trot"})
		console.log(event);
		res.render('turkey-trot', {
			eventName: event.eventName,
			coordinator: event.coordinator,
			// // date: event.date,
			month: monthNames[Number(event.date.slice(5, 7)) - 1].split("").join(" ").toUpperCase(),
			day: event.date.slice(8),
			time: event.time,
			location: event.location,
			description: event.description,
			attendeeCount: event.attendeeCount
		})
	} catch(e) {
		res.status(500).send(e)
	}
})

router.get('/coastal-cleanup', async (req, res) => {
	const eventName = req.params

	try {
		const event = await Event.findOne({eventName:"Coastal Cleanup"})
		res.render('coastal-cleanup', {
			eventName: event.eventName,
			coordinator: event.coordinator,
			// // date: event.date,
			month: monthNames[Number(event.date.slice(5, 7)) - 1].split("").join(" ").toUpperCase(),
			day: event.date.slice(8),
			time: event.time,
			location: event.location,
			description: event.description,
			attendeeCount: event.attendeeCount
		})
	} catch(e) {
		res.status(500).send()
	}
})


router.get('/home', (req, res) => {
	router.render('home')
})

router.get('/profiles', (req,res) => { 
	router.render('profile')
})

router.get('/login', (req,res) => { 
	router.render('login')
})

router.get('/contactus', (req,res) => { 
	router.render('contactus')
})

router.get('/events', async (req, res) => { 
	try { 
		const events = await Event.find({})
		// console.log(events)
		res.render('events', {
			events: events
		})
	} catch (e) { 
		res.status(600).send()
	}
})

router.get('*', (req, res) => { 
	router.render('404 error')
})

module.exports = router