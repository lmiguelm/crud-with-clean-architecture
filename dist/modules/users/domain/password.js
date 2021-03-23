"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Password = void 0;

var yup = _interopRequireWildcard(require("yup"));

var _Either = require("../../../shared/logic/Either");

var _InvalidPasswordError = require("./errors/InvalidPasswordError");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Password {
  constructor(password) {
    this.password = password;
  }

  get value() {
    return this.password;
  }

  static async validate(password) {
    const scheme = yup.string().min(5).max(255).required();
    return await scheme.isValid(password);
  }

  static async create(password) {
    if (await this.validate(password)) {
      return (0, _Either.right)(new Password(password));
    }

    return (0, _Either.left)(new _InvalidPasswordError.InvalidPasswordError('Senha incorreta!'));
  }

}

exports.Password = Password;