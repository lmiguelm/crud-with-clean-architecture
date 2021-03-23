"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserUseCase = void 0;

var _tsyringe = require("tsyringe");

var _Either = require("../../../../shared/logic/Either");

var _IEnconderProvider = require("../../../../shared/infra/providers/Encoder/IEnconderProvider");

var _ITokenProvider = require("../../infra/providers/token/ITokenProvider");

var _IUsersRepository = require("../../repositories/IUsersRepository");

var _InvalidEmailOrPassword = require("./errors/InvalidEmailOrPassword");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let AuthenticateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('EncoderProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('TokenProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IEnconderProvider.IEncoderProvider === "undefined" ? Object : _IEnconderProvider.IEncoderProvider, typeof _ITokenProvider.ITokenProvider === "undefined" ? Object : _ITokenProvider.ITokenProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class AuthenticateUserUseCase {
  constructor(usersRepository, encoderProvider, tokenManager) {
    this.usersRepository = usersRepository;
    this.encoderProvider = encoderProvider;
    this.tokenManager = tokenManager;
  }

  async execute({
    email,
    password
  }) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return (0, _Either.left)(new _InvalidEmailOrPassword.InvalidEmailOrPassword());
    }

    const isPasswordOrError = await this.encoderProvider.compare(password, user.password);

    if (isPasswordOrError.isLeft()) {
      return (0, _Either.left)(new _InvalidEmailOrPassword.InvalidEmailOrPassword());
    }

    const token = this.tokenManager.sign(user.id);
    return (0, _Either.right)({
      token
    });
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;