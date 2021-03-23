"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Name = void 0;

var yup = _interopRequireWildcard(require("yup"));

var _Either = require("../../../shared/logic/Either");

var _InvalidNameError = require("./errors/InvalidNameError");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Name {
  constructor(name) {
    this.name = name;
  }

  get value() {
    return this.name;
  }

  static async validate(name) {
    const scheme = yup.string().required().min(5).max(255);
    return await scheme.isValid(name);
  }

  static async create(name) {
    if (await this.validate(name)) {
      return (0, _Either.right)(new Name(name));
    }

    return (0, _Either.left)(new _InvalidNameError.InvalidNameError('Nome invalido'));
  }

}

exports.Name = Name;