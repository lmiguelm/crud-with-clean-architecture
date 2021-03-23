"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRoutes = void 0;

var _express = require("express");

var _AuthenticateUserController = require("../controllers/AuthenticateUserController");

const authRoutes = (0, _express.Router)();
exports.authRoutes = authRoutes;
authRoutes.post('/authenticate', _AuthenticateUserController.authenticateUserController.handle);