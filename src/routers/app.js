const path = require('path')
const express = require('express');
require('../db/mongoose')
const Event = require('../models/events')
const hbs = require('hbs')
const router = express();

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

// Configure views directory path
const viewsPath = path.join(__dirname, '../templates/views')
router.set('view engine', 'hbs')
router.set('views', viewsPath)


router.get('', (req, res) => {
	router.render('index')
})


router.get('/events/:eventName', async (req, res) => {
	var name = req.params.eventName
	var eventPath = "/events/" + req.params.eventName
	console.log(eventPath);
	try {
		const event = await Event.findOne({href: eventPath})
		res.render(name, {
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


router.get('/home', (req, res) => {
	router.render('home')
})

router.get('/profiles', (req,res) => { 
	router.render('profile')
})

router.get('/login', (req,res) => { 
	router.render('Login.html')
})

router.get('/contactus', (req,res) => { 
	router.render('contactus')
})

// router.get('*', (req, res) => { 
// 	router.render('404 error')
// })

module.exports = router