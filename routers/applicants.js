import _regeneratorRuntime from 'babel-runtime/regenerator';

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = require('express');
require('../db/mongoose');
var Applicant = require('../models/applicants');
var router = new express.Router();

// REST APIs
// Add Applicant
router.post('/applicants', function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(req, res) {
		var applicant;
		return _regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						applicant = new Applicant(req.body);

						console.log(applicant);
						_context.prev = 2;
						_context.next = 5;
						return applicant.save();

					case 5:
						res.status(201).send(applicant);
						_context.next = 11;
						break;

					case 8:
						_context.prev = 8;
						_context.t0 = _context['catch'](2);

						res.status(400).send(_context.t0);

					case 11:
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

// Read ALL Applicants
router.get('/applicants', function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(req, res) {
		var applicants;
		return _regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;
						_context2.next = 3;
						return Applicant.find({});

					case 3:
						applicants = _context2.sent;

						res.send(applicants);
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

// Read SINGLE Applicant
router.get('/applicants/:id', function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(req, res) {
		var applicants;
		return _regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.prev = 0;
						_context3.next = 3;
						return Applicant.findById(_id);

					case 3:
						applicants = _context3.sent;

						if (applicant) {
							_context3.next = 6;
							break;
						}

						return _context3.abrupt('return', res.status(404).send());

					case 6:

						// if found send user
						res.send(user);
						//send 500 error if error
						_context3.next = 12;
						break;

					case 9:
						_context3.prev = 9;
						_context3.t0 = _context3['catch'](0);

						res.status(500).send();

					case 12:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, _this, [[0, 9]]);
	}));

	return function (_x5, _x6) {
		return _ref3.apply(this, arguments);
	};
}());

// Delete Applicant
router.delete('/applicants/:id', function () {
	var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(req, res) {
		var _applicant;

		return _regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.prev = 0;
						_context4.next = 3;
						return Applicant.findByIdAndDelete(req.params.id);

					case 3:
						_applicant = _context4.sent;

						if (_applicant) {
							_context4.next = 6;
							break;
						}

						return _context4.abrupt('return', res.status(404).send());

					case 6:

						// if found send user
						res.send(user);
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

// Update Applicant
router.patch('./Applicants/:id', function () {
	var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(req, res) {
		var updates, allowedUpdates, isValidOperation, _applicant2;

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
						return Applicant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

					case 8:
						_applicant2 = _context5.sent;

						if (_applicant2) {
							_context5.next = 11;
							break;
						}

						return _context5.abrupt('return', res.status(404).send());

					case 11:

						res.send(_applicant2);
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

// Export Applicant router
module.exports = router;