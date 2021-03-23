"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenError = void 0;

class TokenError extends Error {
  constructor() {
    super('Token inválido!');
    this.message = 'TokenError';
  }

}

exports.TokenError = TokenError;