"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserUseCase = void 0;

var _tsyringe = require("tsyringe");

var _Either = require("../../../../shared/logic/Either");

var _IUsersRepository = require("../../repositories/IUsersRepository");

var _UserNotFound = require("./errors/UserNotFound");

var _dec, _dec2, _dec3, _dec4, _class;

let UpdateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateUserUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(id, data) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      return (0, _Either.left)(new _UserNotFound.UserNotFound());
    }

    user.name = data.name ?? user.name;
    user.email = data.email ?? user.email;
    user.password = data.password ?? user.password;
    await this.usersRepository.update(id, user);
    return (0, _Either.right)(user);
  }

}) || _class) || _class) || _class) || _class);
exports.UpdateUserUseCase = UpdateUserUseCase;