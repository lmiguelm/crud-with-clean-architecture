"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _express = require("express");

var _user = require("../../../modules/users/infra/http/routes/user.routes");

var _auth = require("../../../modules/users/infra/http/routes/auth.routes");

const routes = (0, _express.Router)();
exports.routes = routes;
routes.use('/api/users', _user.userRoutes);
routes.use('/api', _auth.authRoutes);