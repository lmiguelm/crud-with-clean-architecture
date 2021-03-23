"use strict";

var _tsyringe = require("tsyringe");

var _JwtProvider = require("./token/implementations/JwtProvider");

_tsyringe.container.registerSingleton('TokenProvider', _JwtProvider.JwtProvider);