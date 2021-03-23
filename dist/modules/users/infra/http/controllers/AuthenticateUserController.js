"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateUserController = void 0;

var _tsyringe = require("tsyringe");

var _AuthenticateUserUseCase = require("../../../useCases/AuthenticateUser/AuthenticateUserUseCase");

class AuthenticateUserController {
  async handle(req, res) {
    try {
      const {
        email,
        password
      } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: 'Parâmetros obrigatórios não informados.'
        });
      }

      const authenticateUser = _tsyringe.container.resolve(_AuthenticateUserUseCase.AuthenticateUserUseCase);

      const tokenOrError = await authenticateUser.execute(req.body);

      if (tokenOrError.isLeft()) {
        return res.status(400).json({
          error: tokenOrError.value.message
        });
      }

      res.setHeader('Authorization', tokenOrError.value.token);
      return res.send();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: 'Erro interno do servidor.'
      });
    }
  }

}

const authenticateUserController = new AuthenticateUserController();
exports.authenticateUserController = authenticateUserController;