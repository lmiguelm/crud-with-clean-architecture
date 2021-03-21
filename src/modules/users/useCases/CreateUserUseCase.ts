import { injectable, inject } from 'tsyringe';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
}
