import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from '../../../useCases/CreateUser/CreateUserUseCase';

class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({ error: 'Parâmetros obrigatórios não informados.' });
      }

      const createUserUse = container.resolve(CreateUserUseCase);
      const userOrError = await createUserUse.execute(req.body);

      if (userOrError.isLeft()) {
        return res.status(400).json({ error: userOrError.value.message });
      }

      return res.status(201).json(userOrError.value);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

export const createUserController = new CreateUserController();
