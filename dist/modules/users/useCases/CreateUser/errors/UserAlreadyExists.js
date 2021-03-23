"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserAlreadyExists = void 0;

class UserAlreadyExists extends Error {
  constructor(email) {
    super(`Usuário com o email '${email}' já foi cadastrado em nosso sistema!`);
    this.name = 'UserAlreadyExists';
  }

}

exports.UserAlreadyExists = UserAlreadyExists;