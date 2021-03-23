"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JwtProvider = void 0;

var _auth = require("../../../../../../configs/auth");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Either = require("../../../../../../shared/logic/Either");

var _TokenError = require("../errors/TokenError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class JwtProvider {
  constructor() {
    this.expiresIn = void 0;
    this.secret = void 0;
    this.expiresIn = _auth.authConfig.expiresIn;
    this.secret = _auth.authConfig.secret;
  }

  sign(id, expiresIn) {
    const token = _jsonwebtoken.default.sign({
      id
    }, this.secret, {
      expiresIn: expiresIn ?? this.expiresIn
    });

    return `Bearer ${token}`;
  }

  verify(token) {
    try {
      const [type, hash] = token.split(' ');

      if (type !== 'Bearer') {
        return (0, _Either.left)(new _TokenError.TokenError());
      }

      const decoded = _jsonwebtoken.default.verify(hash, this.secret);

      return (0, _Either.right)(decoded);
    } catch (_) {
      return (0, _Either.left)(new _TokenError.TokenError());
    }
  }

}

exports.JwtProvider = JwtProvider;