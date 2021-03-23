"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CannotGenerateTemplate = void 0;

class CannotGenerateTemplate extends Error {
  constructor() {
    super(`Não foi possivel gerar o template de e-mail`);
    this.message = 'CannotGenerateTemplate';
  }

}

exports.CannotGenerateTemplate = CannotGenerateTemplate;