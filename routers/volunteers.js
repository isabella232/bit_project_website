import _regeneratorRuntime from 'babel-runtime/regenerator';

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = require('express');
require('../db/mongoose');
var Volunteer = require('../models/volunteers');
var router = new express.Router();
var auth = require('../middleware/auth');

app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// REST APIs
// Add Volunteer

router.post('/volunteers', function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(req, res) {
		var volunteer;
		return _regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						console.log(req.body);
						volunteer = new Volunteer(req.body);
						_context.prev = 2;
						_context.next = 5;
						return volunteer.save();

					case 5:
						res.status(201).redirect("Login.html");
						_context.next = 12;
						break;

					case 8:
						_context.prev = 8;
						_context.t0 = _context['catch'](2);

						console.log(_context.t0);
						res.status(400).send(_context.t0);

					case 12:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, _this, [[2, 8]]);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}());

// Read ALL volunteers
router.get('/volunteers', function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(req, res) {
		var volunteers;
		return _regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;
						_context2.next = 3;
						return Volunteer.find({});

					case 3:
						volunteers = _context2.sent;

						res.send(volunteers);
						_context2.next = 10;
						break;

					case 7:
						_context2.prev = 7;
						_context2.t0 = _context2['catch'](0);

						res.status(500).send();

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

router.post('/volunteers/login', function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(req, res) {
		var _volunteer, token;

		return _regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						console.log("Login!");
						_context3.prev = 1;
						_context3.next = 4;
						return Volunteer.findByCredentials(req.body.email, req.body.password);

					case 4:
						_volunteer = _context3.sent;
						_context3.next = 7;
						return _volunteer.generateAuthToken();

					case 7:
						token = _context3.sent;

						res.status(201).send({ volunteer: _volunteer, token: token });
						_context3.next = 14;
						break;

					case 11:
						_context3.prev = 11;
						_context3.t0 = _context3['catch'](1);

						res.status(400).send();

					case 14:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, _this, [[1, 11]]);
	}));

	return function (_x5, _x6) {
		return _ref3.apply(this, arguments);
	};
}());

router.post('/volunteers/logout', auth, function () {
	var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(req, res) {
		return _regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.prev = 0;

						req.volunteer.tokens = req.volunteer.tokens.filter(function (token) {
							return token.token !== req.token;
						});
						_context4.next = 4;
						return req.volunteer.save();

					case 4:

						res.send();
						_context4.next = 11;
						break;

					case 7:
						_context4.prev = 7;
						_context4.t0 = _context4['catch'](0);

						console.log(_context4.t0);
						res.status(500).send();

					case 11:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, _this, [[0, 7]]);
	}));

	return function (_x7, _x8) {
		return _ref4.apply(this, arguments);
	};
}());

// Update Volunteer
router.patch('/volunteers/:id', function () {
	var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(req, res) {
		var updates, allowedUpdates, isValidOperation, _volunteer2;

		return _regeneratorRuntime.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						updates = Object.keys(req.body);
						allowedUpdates = ['firstName', 'lastName', 'age', 'email', 'password', 'eventCount'];
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
						return Volunteer.findById(req.params.id);

					case 8:
						_volunteer2 = _context5.sent;

						updates.forEach(function (update) {
							return _volunteer2[update] = req.body[update];
						});
						_context5.next = 12;
						return _volunteer2.save();

					case 12:
						if (_volunteer2) {
							_context5.next = 14;
							break;
						}

						return _context5.abrupt('return', res.status(404).send());

					case 14:
						res.send(_volunteer2);
						_context5.next = 20;
						break;

					case 17:
						_context5.prev = 17;
						_context5.t0 = _context5['catch'](5);

						res.status(400).send();

					case 20:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, _this, [[5, 17]]);
	}));

	return function (_x9, _x10) {
		return _ref5.apply(this, arguments);
	};
}());

router.get('/volunteers/profile', auth, function () {
	var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(req, res) {
		return _regeneratorRuntime.wrap(function _callee6$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						res.send(req.volunteer);

					case 1:
					case 'end':
						return _context6.stop();
				}
			}
		}, _callee6, _this);
	}));

	return function (_x11, _x12) {
		return _ref6.apply(this, arguments);
	};
}());

// Read a single volunteer (login a person) by cross checking email/password
router.get('/volunteers/:email', function () {
	var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(req, res) {
		var email, volunteers;
		return _regeneratorRuntime.wrap(function _callee7$(_context7) {
			while (1) {
				switch (_context7.prev = _context7.next) {
					case 0:
						_context7.prev = 0;
						email = req.params;
						_context7.next = 4;
						return Volunteer.findOne(email);

					case 4:
						volunteers = _context7.sent;

						if (volunteer) {
							_context7.next = 7;
							break;
						}

						return _context7.abrupt('return', res.status(404).send());

					case 7:

						// if found send user
						res.send(user);
						//send 500 error if error
						_context7.next = 13;
						break;

					case 10:
						_context7.prev = 10;
						_context7.t0 = _context7['catch'](0);

						res.status(500).send();

					case 13:
					case 'end':
						return _context7.stop();
				}
			}
		}, _callee7, _this, [[0, 10]]);
	}));

	return function (_x13, _x14) {
		return _ref7.apply(this, arguments);
	};
}());

// Delete Volunteer
router.delete('/volunteers/:id', function () {
	var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(req, res) {
		var _volunteer3, token;

		return _regeneratorRuntime.wrap(function _callee8$(_context8) {
			while (1) {
				switch (_context8.prev = _context8.next) {
					case 0:
						_context8.prev = 0;
						_context8.next = 3;
						return _volunteer3.findByIdAndDelete(req.params.id);

					case 3:
						_volunteer3 = _context8.sent;
						_context8.next = 6;
						return _volunteer3.generateAuthToken();

					case 6:
						token = _context8.sent;

						if (_volunteer3) {
							_context8.next = 9;
							break;
						}

						return _context8.abrupt('return', res.status(404).send());

					case 9:

						// if found send user
						res.send(_volunteer3);
						//send 500 error if error
						_context8.next = 15;
						break;

					case 12:
						_context8.prev = 12;
						_context8.t0 = _context8['catch'](0);

						res.status(500).send();

					case 15:
					case 'end':
						return _context8.stop();
				}
			}
		}, _callee8, _this, [[0, 12]]);
	}));

	return function (_x15, _x16) {
		return _ref8.apply(this, arguments);
	};
}());

// Export Volunteer router
module.exports = router;