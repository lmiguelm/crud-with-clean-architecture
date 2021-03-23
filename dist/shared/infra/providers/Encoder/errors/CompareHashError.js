"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareHashError = void 0;

class CompareHashError extends Error {
  constructor(value, hash) {
    super(`Não foi possível comparar os valores informados!`);
    this.name = 'CompareHashError';
  }

}

exports.CompareHashError = CompareHashError;