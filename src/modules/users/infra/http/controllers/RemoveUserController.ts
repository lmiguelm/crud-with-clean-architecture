import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { RemoveUserUseCase } from '../../../useCases/RemoveUser/RemoveUserUseCase';

class RemoveUserController {
  async handle(req: Request, res: Response) {
    try {
      const id = req.user.id;
      const removeUserUseCase = container.resolve(RemoveUserUseCase);
      const userHasBeenRemovedOrError = await removeUserUseCase.execute(id);

      if (userHasBeenRemovedOrError.isLeft()) {
        return res.status(400).json({ error: userHasBeenRemovedOrError.value.message });
      }

      return res.send();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export const removeUserController = new RemoveUserController();
