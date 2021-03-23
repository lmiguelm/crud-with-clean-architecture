"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Email = void 0;

var yup = _interopRequireWildcard(require("yup"));

var _Either = require("../../../shared/logic/Either");

var _InvalidEmailError = require("./errors/InvalidEmailError");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Email {
  constructor(email) {
    this.email = email;
  }

  get value() {
    return this.email;
  }

  static async validate(email) {
    const scheme = yup.string().email().required().max(255);
    return await scheme.isValid(email);
  }

  static async create(email) {
    if (await this.validate(email)) {
      return (0, _Either.right)(new Email(email));
    }

    return (0, _Either.left)(new _InvalidEmailError.InvalidEmailError(`O E-mail informado é inválido`));
  }

}

exports.Email = Email;