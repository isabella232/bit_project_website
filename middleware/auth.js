import _regeneratorRuntime from 'babel-runtime/regenerator';

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var jwt = require('jsonwebtoken');
var User = require('../models/volunteers');

var auth = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(req, res, next) {
        var token, decoded, user;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log("auth");
                        _context.prev = 1;
                        token = req.header('Authorization').replace('Bearer ', '');

                        console.log(token);
                        decoded = jwt.verify(token, 'thisismysecret');

                        console.log(decoded);
                        _context.next = 8;
                        return User.findOne({ _id: decoded._id, 'tokens.token': token });

                    case 8:
                        user = _context.sent;

                        console.log(user);

                        if (user) {
                            _context.next = 12;
                            break;
                        }

                        throw new Error();

                    case 12:
                        req.token = token;
                        req.volunteer = user;
                        next();
                        _context.next = 20;
                        break;

                    case 17:
                        _context.prev = 17;
                        _context.t0 = _context['catch'](1);

                        res.status(401).send({
                            error: 'Please authenticate.'
                        });

                    case 20:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this, [[1, 17]]);
    }));

    return function auth(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

module.exports = auth;