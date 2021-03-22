import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { UpdateUserUseCase } from '../../../useCases/UpdateUser/UpdateUserUseCase';

class UpdateUserController {
  async handle(req: Request, res: Response) {
    try {
      const id = req.user.id;
      const data = req.body;

      const updateUser = container.resolve(UpdateUserUseCase);
      const userOrError = await updateUser.execute(id, data);

      if (userOrError.isLeft()) {
        return res.status(400).json({ error: userOrError.value.message });
      }

      return res.json(userOrError.value);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
export const updateUserController = new UpdateUserController();
