"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mailConfig = void 0;

var _environments = require("../shared/utils/environments");

const mailConfig = {
  sendgrid: {
    key: _environments.SENDGRID_API_KEY
  },
  mailtrap: {
    host: _environments.MAILTRA_HOST,
    port: Number(_environments.MAILTRAP_PORT),
    auth: {
      user: _environments.MAILTRAP_USER,
      pass: _environments.MAILTRAP_PASS
    }
  }
};
exports.mailConfig = mailConfig;