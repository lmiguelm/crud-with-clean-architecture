"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidNameError = void 0;

class InvalidNameError extends Error {
  constructor(name) {
    super(`O nome: '${name}' é inválido.`);
    this.name = name;
    this.name = 'InvalidNameError';
  }

}

exports.InvalidNameError = InvalidNameError;