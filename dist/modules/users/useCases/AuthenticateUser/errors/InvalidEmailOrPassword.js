"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidEmailOrPassword = void 0;

class InvalidEmailOrPassword extends Error {
  constructor() {
    super(`E-mail ou senha inválidos!`);
    this.name = 'InvalidEmailOrPassword';
  }

}

exports.InvalidEmailOrPassword = InvalidEmailOrPassword;