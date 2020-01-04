import _regeneratorRuntime from 'babel-runtime/regenerator';

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = require('express');
var path = require('path');
require('../db/mongoose');
var Event = require('../models/events');
var router = new express.Router();

app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// REST APIs

// Routes to add event
router.post('/events', function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(req, res) {
		var event;
		return _regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						event = new Event(req.body);

						console.log(event);
						event.href = "/events/" + event.eventName;
						_context.prev = 3;
						_context.next = 6;
						return event.save();

					case 6:
						res.status(201).redirect('/events');
						_context.next = 12;
						break;

					case 9:
						_context.prev = 9;
						_context.t0 = _context['catch'](3);

						res.status(400).send(_context.t0);

					case 12:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, _this, [[3, 9]]);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}());

// Routes to Events Browsing Page
router.get('/events', function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(req, res) {
		var events;
		return _regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;
						_context2.next = 3;
						return Event.find({});

					case 3:
						events = _context2.sent;

						// Render "events.hbs" with const events
						res.render('events', {
							events: events
						});
						_context2.next = 10;
						break;

					case 7:
						_context2.prev = 7;
						_context2.t0 = _context2['catch'](0);

						res.status(500).send(_context2.t0);

					case 10:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, _this, [[0, 7]]);
	}));

	return function (_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}());

// Read ALL events
// Added functionality, if url has eventName search parameter, fitlers for that event name
router.get('/event', function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(req, res) {
		var query, events, _events;

		return _regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						//Create variable to store filter
						query = {};
						// TODO: Link search bar button to actually retrive it upon searching

						_context3.prev = 1;

						console.log(req.query);
						// const event = await Event.findOne({eventName:"Turkey Trot"})
						// if filter is present
						console.log(req.query.eventName);

						if (!req.query.eventName) {
							_context3.next = 13;
							break;
						}

						query.eventName = req.query.eventName;
						_context3.next = 8;
						return Event.find({ "eventName": query.eventName });

					case 8:
						events = _context3.sent;

						console.log(events);
						res.render('events', {
							events: events
						});
						//no filter present
						_context3.next = 17;
						break;

					case 13:
						_context3.next = 15;
						return Event.find();

					case 15:
						_events = _context3.sent;

						res.send(_events);

					case 17:
						_context3.next = 22;
						break;

					case 19:
						_context3.prev = 19;
						_context3.t0 = _context3['catch'](1);

						res.status(500).send();

					case 22:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, _this, [[1, 19]]);
	}));

	return function (_x5, _x6) {
		return _ref3.apply(this, arguments);
	};
}());

// Read SINGLE event
// Silenced because it was being used before /events/:eventName
// router.get('/events/:id', async (req, res) => { 
//     const _id = req.params.id

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

// Delete Event
router.delete('/events/:id', function () {
	var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(req, res) {
		var event;
		return _regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.prev = 0;
						_context4.next = 3;
						return Event.findByIdAndDelete(req.params.id);

					case 3:
						event = _context4.sent;

						if (event) {
							_context4.next = 6;
							break;
						}

						return _context4.abrupt('return', res.status(404).send());

					case 6:

						// if found send user
						res.send(event);
						//send 500 error if error
						_context4.next = 12;
						break;

					case 9:
						_context4.prev = 9;
						_context4.t0 = _context4['catch'](0);

						res.status(500).send();

					case 12:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, _this, [[0, 9]]);
	}));

	return function (_x7, _x8) {
		return _ref4.apply(this, arguments);
	};
}());

// TODO: Update Event
router.patch('/events/:id', function () {
	var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(req, res) {
		var updates, allowedUpdates, isValidOperation, Admin;
		return _regeneratorRuntime.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						updates = Object.keys(req.body);
						allowedUpdates = ['firstName', 'lastName', 'age', 'email', 'password', 'eventCount', 'isCoordinator', 'assignedToEvent'];
						isValidOperation = updates.every(function (update) {
							return allowedUpdates.includes(update);
						});

						if (isValidOperation) {
							_context5.next = 5;
							break;
						}

						return _context5.abrupt('return', res.status(400).send({ error: 'Invalid update' }));

					case 5:
						_context5.prev = 5;
						_context5.next = 8;
						return Admin.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

					case 8:
						Admin = _context5.sent;

						if (Admin) {
							_context5.next = 11;
							break;
						}

						return _context5.abrupt('return', res.status(404).send());

					case 11:

						res.send(Admin);
						_context5.next = 17;
						break;

					case 14:
						_context5.prev = 14;
						_context5.t0 = _context5['catch'](5);

						res.status(400).send();

					case 17:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, _this, [[5, 14]]);
	}));

	return function (_x9, _x10) {
		return _ref5.apply(this, arguments);
	};
}());

// Export Admin router
module.exports = router;