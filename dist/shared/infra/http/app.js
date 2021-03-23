"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

require("reflect-metadata");

var _typeorm = _interopRequireDefault(require("../../infra/typeorm"));

require("../../container");

var _cors = _interopRequireDefault(require("cors"));

var _routes = require("./routes");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _typeorm.default)();
const app = (0, _express.default)();
exports.app = app;
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_routes.routes);