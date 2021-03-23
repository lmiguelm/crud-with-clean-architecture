"use strict";

var _tsyringe = require("tsyringe");

var _BcryptEncoder = require("./implementations/BcryptEncoder");

_tsyringe.container.registerSingleton('EncoderProvider', _BcryptEncoder.BcryptEncoder);