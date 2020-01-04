"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require('path');

var express = require('express');

require('../db/mongoose');

var Event = require('../models/events');

var hbs = require('hbs');

var router = express();
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // Configure views directory path

var viewsPath = path.join(__dirname, '../templates/views');
router.set('view engine', 'hbs');
router.set('views', viewsPath);
router.get('', function (req, res) {
  router.render('index');
});
router.get('/events/:eventName',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var name, eventPath, event;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = req.params.eventName;
            eventPath = "/events/" + req.params.eventName;
            console.log(eventPath);
            _context.prev = 3;
            _context.next = 6;
            return Event.findOne({
              href: eventPath
            });

          case 6:
            event = _context.sent;
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
            });
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](3);
            res.status(500).send(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 10]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/home', function (req, res) {
  router.render('home');
});
router.get('/profiles', function (req, res) {
  router.render('profile');
});
router.get('/login', function (req, res) {
  router.render('Login.html');
});
router.get('/contactus', function (req, res) {
  router.render('contactus');
}); // router.get('*', (req, res) => { 
// 	router.render('404 error')
// })

module.exports = router;