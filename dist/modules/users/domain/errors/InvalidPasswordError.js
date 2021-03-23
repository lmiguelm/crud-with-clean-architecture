"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidPasswordError = void 0;

class InvalidPasswordError extends Error {
  constructor(password) {
    super(`Senha inválida`);
    this.password = password;
    this.name = 'InvalidPasswordError';
  }

}

exports.InvalidPasswordError = InvalidPasswordError;