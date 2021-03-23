"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _typeorm = require("typeorm");

var _ormconfig = _interopRequireDefault(require("../../../configs/ormconfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function _default() {
  return await (0, _typeorm.createConnection)(_ormconfig.default);
}