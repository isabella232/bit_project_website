"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var validator = require('validator');

var mongoose = require('mongoose');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var VolunteerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    "default": 0,
    // Check if value > 0 and is an integer
    validate: function validate(value) {
      if (value < 0 || !Number.isInteger(value)) {
        throw new Error('Invalid input for age.');
      }
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: function validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid.');
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate: function validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Invalid password.');
      }
    }
  },
  eventCount: {
    type: Number,
    "default": 0
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}); // TEST CASES:
// Password Length Error

var v1 = {
  "firstName": "   Jane   ",
  "lastName": "Vandy  ",
  "email": "  wvandy@super.com    ",
  "password": "123ar"
}; // Valid input

var v2 = {
  "firstName": "   Wendy   ",
  "lastName": " Stein  ",
  "email": "  wstein@super.com    ",
  "password": "123sugarr"
}; // Email error

var v3 = {
  "firstName": "   Kyle   ",
  "lastName": " Kuzma  ",
  "email": "  kk@super   ",
  "password": "123sugarr"
}; // Age error

var v4 = {
  "firstName": "   Wendy   ",
  "lastName": " Stein  ",
  "age": -10,
  "email": "  wstein@super.com    ",
  "password": "123sugarr"
};
VolunteerSchema.methods.generateAuthToken =
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var volunteer, token;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("generate");
          volunteer = this;
          token = jwt.sign({
            _id: volunteer._id.toString()
          }, 'thisismysecret');
          volunteer.tokens = volunteer.tokens.concat({
            token: token
          });
          _context.next = 6;
          return volunteer.save();

        case 6:
          return _context.abrupt("return", token);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));

VolunteerSchema.statics.findByCredentials =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(email, password) {
    var volunteer, isMatch;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('Credential');
            _context2.next = 3;
            return Volunteer.findOne({
              email: email
            });

          case 3:
            volunteer = _context2.sent;
            console.log(volunteer);

            if (volunteer) {
              _context2.next = 7;
              break;
            }

            throw new Error('Unable to login');

          case 7:
            _context2.next = 9;
            return bcrypt.compare(password, volunteer.password);

          case 9:
            isMatch = _context2.sent;
            console.log(isMatch);

            if (isMatch) {
              _context2.next = 13;
              break;
            }

            throw new Error('Unable to login');

          case 13:
            return _context2.abrupt("return", volunteer);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

VolunteerSchema.pre('save',
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(next) {
    var user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            user = this;

            if (!user.isModified('password')) {
              _context3.next = 5;
              break;
            }

            _context3.next = 4;
            return bcrypt.hash(user.password, 8);

          case 4:
            user.password = _context3.sent;

          case 5:
            console.log(user.password);
            next();

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());
var Volunteer = mongoose.model('Volunteer', VolunteerSchema);
module.exports = Volunteer;