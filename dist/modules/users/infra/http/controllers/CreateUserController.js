"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUserController = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserUseCase = require("../../../useCases/CreateUser/CreateUserUseCase");

class CreateUserController {
  async handle(req, res) {
    try {
      const {
        name,
        email,
        password
      } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({
          error: 'Parâmetros obrigatórios não informados.'
        });
      }

      const createUserUse = _tsyringe.container.resolve(_CreateUserUseCase.CreateUserUseCase);

      const userOrError = await createUserUse.execute(req.body);

      if (userOrError.isLeft()) {
        return res.status(400).json({
          error: userOrError.value.message
        });
      }

      return res.status(201).json(userOrError.value);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: 'Erro interno do servidor.'
      });
    }
  }

}

const createUserController = new CreateUserController();
exports.createUserController = createUserController;