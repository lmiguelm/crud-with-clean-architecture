"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listUserController = void 0;

var _tsyringe = require("tsyringe");

var _ListUserUseCase = require("../../../useCases/ListUser/ListUserUseCase");

class ListUserController {
  async handle(req, res) {
    const id = req.user.id;

    const listUser = _tsyringe.container.resolve(_ListUserUseCase.ListUserUseCase);

    const user = await listUser.execute(id);
    return res.json(user);
  }

}

const listUserController = new ListUserController();
exports.listUserController = listUserController;