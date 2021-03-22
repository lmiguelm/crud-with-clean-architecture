import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from '../../../useCases/AuthenticateUser/AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Parâmetros obrigatórios não informados.' });
      }

      const authenticateUser = container.resolve(AuthenticateUserUseCase);

      const tokenOrError = await authenticateUser.execute(req.body);

      if (tokenOrError.isLeft()) {
        return res.status(400).json({ error: tokenOrError.value.message });
      }

      res.setHeader('Authorization', tokenOrError.value.token);
      return res.send();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

export const authenticateUserController = new AuthenticateUserController();
