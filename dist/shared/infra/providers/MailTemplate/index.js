"use strict";

var _tsyringe = require("tsyringe");

var _HandlebarsTemplateProvider = require("./implementations/HandlebarsTemplateProvider");

_tsyringe.container.registerSingleton('MailTemplateProvider', _HandlebarsTemplateProvider.HandlebarsTemplateProvider);