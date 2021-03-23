"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _Either = require("../../../shared/logic/Either");

var _name = require("./name");

var _email = require("./email");

var _password = require("./password");

class User {
  constructor(email, name, password) {
    this.email = email;
    this.name = name;
    this.password = password;
  }

  static async create(user) {
    const nameOrError = await _name.Name.create(user.name);
    const emailOrError = await _email.Email.create(user.email);
    const passwordOrError = await _password.Password.create(user.password);

    if (nameOrError.isLeft()) {
      return (0, _Either.left)(nameOrError.value);
    }

    if (emailOrError.isLeft()) {
      return (0, _Either.left)(emailOrError.value);
    }

    if (passwordOrError.isLeft()) {
      return (0, _Either.left)(passwordOrError.value);
    }

    const name = nameOrError.value;
    const email = emailOrError.value;
    const password = passwordOrError.value;
    return (0, _Either.right)(new User(email, name, password));
  }

}

exports.User = User;