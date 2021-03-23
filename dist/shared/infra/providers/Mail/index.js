"use strict";

var _tsyringe = require("tsyringe");

var _MailtrapProvider = require("./implementations/MailtrapProvider");

var _FakeMailProvider = require("./implementations/FakeMailProvider");

var _SendGridMailProvider = require("./implementations/SendGridMailProvider");

var _environments = require("../../../utils/environments");

const providers = {
  sendgrid: _SendGridMailProvider.SendGridMailProvider,
  mailtrap: _MailtrapProvider.MailtrapProvider,
  fake: _FakeMailProvider.FakeMailProvider
};

_tsyringe.container.registerSingleton('MailProvider', providers[_environments.MAIL_PROVIDER]);