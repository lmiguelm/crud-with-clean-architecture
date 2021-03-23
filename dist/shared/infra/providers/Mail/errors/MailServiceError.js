"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailServiceError = void 0;

class MailServiceError extends Error {
  constructor(email) {
    super(`Não foi possível enviar e-mail para ${email}`);
  }

}

exports.MailServiceError = MailServiceError;