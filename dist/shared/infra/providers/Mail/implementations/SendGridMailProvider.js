"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendGridMailProvider = void 0;

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _mailconfig = require("../../../../../configs/mailconfig");

var _Either = require("../../../../logic/Either");

var _MailServiceError = require("../errors/MailServiceError");

var _IMailTemplateProvider = require("../../MailTemplate/IMailTemplateProvider");

var _tsyringe = require("tsyringe");

var _environments = require("../../../../utils/environments");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SendGridMailProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('MailTemplateProvider')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IMailTemplateProvider.IMailTemplateProvider === "undefined" ? Object : _IMailTemplateProvider.IMailTemplateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class SendGridMailProvider {
  constructor(template) {
    this.template = template;
    console.log(_mailconfig.mailConfig.sendgrid.key);

    _mail.default.setApiKey(_mailconfig.mailConfig.sendgrid.key);
  }

  async sendMail({
    to,
    from = {
      name: _environments.NAME,
      address: _environments.MAIL
    },
    subject,
    template
  }) {
    const templateOrError = await this.template.parse(template);

    if (templateOrError.isLeft()) {
      return (0, _Either.left)(templateOrError.value);
    }

    try {
      const mail = {
        to: to.address,
        from: from.address,
        subject,
        html: templateOrError.value
      };
      await _mail.default.send(mail);
      return (0, _Either.right)(true);
    } catch (error) {
      console.log(error);
      return (0, _Either.left)(new _MailServiceError.MailServiceError(to.address));
    }
  }

}) || _class) || _class) || _class) || _class);
exports.SendGridMailProvider = SendGridMailProvider;