"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandlebarsTemplateProvider = void 0;

var _handlebars = _interopRequireDefault(require("handlebars"));

var _fs = _interopRequireDefault(require("fs"));

var _CannotGenerateTemplate = require("../errors/CannotGenerateTemplate");

var _Either = require("../../../../logic/Either");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HandlebarsTemplateProvider {
  async parse({
    file,
    variables
  }) {
    try {
      const templateFileContent = _fs.default.readFileSync(file).toString('utf-8');

      const mailTemplateParse = _handlebars.default.compile(templateFileContent);

      const html = mailTemplateParse(variables);
      return (0, _Either.right)(html);
    } catch (error) {
      console.log(error);
      (0, _Either.left)(new _CannotGenerateTemplate.CannotGenerateTemplate());
    }
  }

}

exports.HandlebarsTemplateProvider = HandlebarsTemplateProvider;