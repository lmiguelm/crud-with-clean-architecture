"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveUserUseCase = void 0;

var _tsyringe = require("tsyringe");

var _Either = require("../../../../shared/logic/Either");

var _IUsersRepository = require("../../repositories/IUsersRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let RemoveUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class RemoveUserUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(id) {
    const userHasBeenRemoved = await this.usersRepository.delete(id);

    if (!userHasBeenRemoved) {
      return (0, _Either.left)(new Error('Não foi possível remover'));
    }

    return (0, _Either.right)(true);
  }

}) || _class) || _class) || _class) || _class);
exports.RemoveUserUseCase = RemoveUserUseCase;