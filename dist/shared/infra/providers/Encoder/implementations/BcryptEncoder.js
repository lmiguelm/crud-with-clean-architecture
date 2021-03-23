"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BcryptEncoder = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _Either = require("../../../../logic/Either");

var _EncoderError = require("../errors/EncoderError");

var _CompareHashError = require("../errors/CompareHashError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BcryptEncoder {
  async encode(value) {
    try {
      const valueEncoded = await _bcrypt.default.hash(value, _bcrypt.default.genSaltSync());
      return (0, _Either.right)(valueEncoded);
    } catch (error) {
      console.log(error);
      return (0, _Either.left)(new _EncoderError.EncodeError(value));
    }
  }

  async compare(value, hash) {
    try {
      return (0, _Either.right)(await _bcrypt.default.compare(value, hash));
    } catch (error) {
      console.log(error);
      return (0, _Either.left)(new _CompareHashError.CompareHashError(value, hash));
    }
  }

}

exports.BcryptEncoder = BcryptEncoder;