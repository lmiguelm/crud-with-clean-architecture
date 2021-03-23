"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authConfig = void 0;

var _environments = require("../shared/utils/environments");

const authConfig = {
  secret: _environments.SECRET,
  expiresIn: _environments.EXPIRESIN
};
exports.authConfig = authConfig;