"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EncodeError = void 0;

class EncodeError extends Error {
  constructor(value) {
    super(`Não foi possível criptografar o valor informado!`);
    this.name = 'EncodeError';
  }

}

exports.EncodeError = EncodeError;