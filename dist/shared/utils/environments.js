"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EXPIRESIN = exports.SECRET = exports.SENDGRID_API_KEY = exports.MAILTRAP_PASS = exports.MAILTRAP_USER = exports.MAILTRAP_PORT = exports.MAILTRA_HOST = exports.TYPEORM_DATABASE = exports.TYPEORM_PASSWORD = exports.TYPEORM_USERNAME = exports.TYPEORM_PORT = exports.TYPEORM_HOST = exports.TYPEORM_TYPE = exports.NAME = exports.MAIL = exports.MAIL_PROVIDER = exports.NODE_ENV = exports.PORT = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config(); // application


const {
  PORT,
  NODE_ENV,
  MAIL_PROVIDER,
  MAIL,
  NAME
} = process.env; // typeorm

exports.NAME = NAME;
exports.MAIL = MAIL;
exports.MAIL_PROVIDER = MAIL_PROVIDER;
exports.NODE_ENV = NODE_ENV;
exports.PORT = PORT;
const {
  TYPEORM_TYPE,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE
} = process.env; // mailtrap

exports.TYPEORM_DATABASE = TYPEORM_DATABASE;
exports.TYPEORM_PASSWORD = TYPEORM_PASSWORD;
exports.TYPEORM_USERNAME = TYPEORM_USERNAME;
exports.TYPEORM_PORT = TYPEORM_PORT;
exports.TYPEORM_HOST = TYPEORM_HOST;
exports.TYPEORM_TYPE = TYPEORM_TYPE;
const {
  MAILTRA_HOST,
  MAILTRAP_PORT,
  MAILTRAP_USER,
  MAILTRAP_PASS
} = process.env; // sendgrid

exports.MAILTRAP_PASS = MAILTRAP_PASS;
exports.MAILTRAP_USER = MAILTRAP_USER;
exports.MAILTRAP_PORT = MAILTRAP_PORT;
exports.MAILTRA_HOST = MAILTRA_HOST;
const {
  SENDGRID_API_KEY
} = process.env; // auth

exports.SENDGRID_API_KEY = SENDGRID_API_KEY;
const {
  SECRET,
  EXPIRESIN
} = process.env;
exports.EXPIRESIN = EXPIRESIN;
exports.SECRET = SECRET;