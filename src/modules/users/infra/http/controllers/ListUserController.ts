import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ListUserUseCase } from '../../../useCases/ListUser/ListUserUseCase';

class ListUserController {
  async handle(req: Request, res: Response) {
    const id = req.user.id;
    const listUser = container.resolve(ListUserUseCase);
    const user = await listUser.execute(id);
    return res.json(user);
  }
}

export const listUserController = new ListUserController();
