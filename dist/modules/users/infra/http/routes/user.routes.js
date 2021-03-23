"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoutes = void 0;

var _express = require("express");

var _tsyringe = require("tsyringe");

var _EnsureAuthenticatedMiddleware = require("../middlewares/EnsureAuthenticatedMiddleware");

var _CreateUserController = require("../controllers/CreateUserController");

var _UpdateUserController = require("../controllers/UpdateUserController");

var _ListUserController = require("../controllers/ListUserController");

var _RemoveUserController = require("../controllers/RemoveUserController");

const ensureAuthenticated = _tsyringe.container.resolve(_EnsureAuthenticatedMiddleware.EnsureAuthenticatedMiddleware);

const userRoutes = (0, _express.Router)();
exports.userRoutes = userRoutes;
userRoutes.post('/', _CreateUserController.createUserController.handle);
userRoutes.get('/', (req, res, next) => ensureAuthenticated.execute(req, res, next), _ListUserController.listUserController.handle);
userRoutes.put('/', (req, res, next) => ensureAuthenticated.execute(req, res, next), _UpdateUserController.updateUserController.handle);
userRoutes.delete('/', (req, res, next) => ensureAuthenticated.execute(req, res, next), _RemoveUserController.removeUserController.handle);