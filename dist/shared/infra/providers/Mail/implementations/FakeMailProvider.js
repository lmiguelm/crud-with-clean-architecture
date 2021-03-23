"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FakeMailProvider = void 0;

var _Either = require("../../../../logic/Either");

class FakeMailProvider {
  async sendMail(_) {
    return (0, _Either.right)(true);
  }

}

exports.FakeMailProvider = FakeMailProvider;