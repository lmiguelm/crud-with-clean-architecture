"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailtrapProvider = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _mailconfig = require("../../../../../configs/mailconfig");

var _Either = require("../../../../logic/Either");

var _MailServiceError = require("../errors/MailServiceError");

var _environments = require("../../../../utils/environments");

var _tsyringe = require("tsyringe");

var _IMailTemplateProvider = require("../../MailTemplate/IMailTemplateProvider");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let MailtrapProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('MailTemplateProvider')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IMailTemplateProvider.IMailTemplateProvider === "undefined" ? Object : _IMailTemplateProvider.IMailTemplateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class MailtrapProvider {
  constructor(template) {
    this.template = template;
    this.transporter = void 0;
    this.transporter = _nodemailer.default.createTransport(_mailconfig.mailConfig.mailtrap);
  }

  async sendMail({
    from = {
      name: _environments.NAME,
      address: _environments.MAIL
    },
    to,
    subject,
    template
  }) {
    const templateOrError = await this.template.parse(template);

    if (templateOrError.isLeft()) {
      return (0, _Either.left)(templateOrError.value);
    }

    try {
      await this.transporter.sendMail({
        from,
        to,
        subject,
        html: templateOrError.value
      });
      return (0, _Either.right)(true);
    } catch (error) {
      console.log(error);
      return (0, _Either.left)(new _MailServiceError.MailServiceError(to.address));
    }
  }

}) || _class) || _class) || _class) || _class);
exports.MailtrapProvider = MailtrapProvider;