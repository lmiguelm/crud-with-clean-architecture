import { inject, injectable } from 'tsyringe';
import { Either, right } from '../../../../shared/logic/Either';
import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

type ListUserUseCaseResponse = Promise<User>;

@injectable()
export class ListUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): ListUserUseCaseResponse {
    const user = await this.usersRepository.findById(id);
    return user;
  }
}
