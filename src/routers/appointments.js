'use strict';

const express = require('express');
const momentTimeZone = require('moment-timezone');
const moment = require('moment');
const Appointment = require('../models/appointment');
const router = new express.Router();


const getTimeZones = function() {
  return momentTimeZone.tz.names();
};

// // GET: /appointments
// router.get('/', function(req, res, next) {
//   Appointment.find()
//     .then(function(appointments) {
//       res.render('appointments/index', {appointments: appointments});
//     });
// });

// GET: /appointments/create
router.get('/create', function(req, res, next) {
  res.render('appointments/create', {
    timeZones: getTimeZones(),
    appointment: new Appointment({name: '',
                                  phoneNumber: '',
                                  notification: '',
                                  timeZone: '',
                                  time: ''})});
});

// // POST: /appointments
// router.post('/', function(req, res, next) {
//   const name = req.body.name;
//   const phoneNumber = req.body.phoneNumber;
//   const notification = req.body.notification;
//   const timeZone = req.body.timeZone;
//   const time = moment(req.body.time, 'MM-DD-YYYY hh:mma');

//   const appointment = new Appointment({name: name,
//                                        phoneNumber: phoneNumber,
//                                        notification: notification,
//                                        timeZone: timeZone,
//                                        time: time});
//   appointment.save()
//     .then(function() {
//       res.redirect('/');
//     });
// });

// Export Volunteer router
module.exports = router