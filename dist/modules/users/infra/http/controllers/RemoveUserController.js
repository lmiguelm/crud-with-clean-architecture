"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeUserController = void 0;

var _tsyringe = require("tsyringe");

var _RemoveUserUseCase = require("../../../useCases/RemoveUser/RemoveUserUseCase");

class RemoveUserController {
  async handle(req, res) {
    try {
      const id = req.user.id;

      const removeUserUseCase = _tsyringe.container.resolve(_RemoveUserUseCase.RemoveUserUseCase);

      const userHasBeenRemovedOrError = await removeUserUseCase.execute(id);

      if (userHasBeenRemovedOrError.isLeft()) {
        return res.status(400).json({
          error: userHasBeenRemovedOrError.value.message
        });
      }

      return res.send();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }

}

const removeUserController = new RemoveUserController();
exports.removeUserController = removeUserController;