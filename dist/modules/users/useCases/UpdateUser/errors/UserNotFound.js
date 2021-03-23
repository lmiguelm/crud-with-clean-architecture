"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserNotFound = void 0;

class UserNotFound extends Error {
  constructor() {
    super(`Usuário não encontrado.`);
    this.message = 'UserNotFound';
  }

}

exports.UserNotFound = UserNotFound;