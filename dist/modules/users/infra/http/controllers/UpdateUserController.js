"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserController = void 0;

var _tsyringe = require("tsyringe");

var _UpdateUserUseCase = require("../../../useCases/UpdateUser/UpdateUserUseCase");

class UpdateUserController {
  async handle(req, res) {
    try {
      const id = req.user.id;
      const data = req.body;

      const updateUser = _tsyringe.container.resolve(_UpdateUserUseCase.UpdateUserUseCase);

      const userOrError = await updateUser.execute(id, data);

      if (userOrError.isLeft()) {
        return res.status(400).json({
          error: userOrError.value.message
        });
      }

      return res.json(userOrError.value);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }

}

const updateUserController = new UpdateUserController();
exports.updateUserController = updateUserController;