import { inject, injectable } from 'tsyringe';
import { Either, left, right } from '../../../../shared/logic/Either';
import { IUserProps } from '../../dtos/IUser';
import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { UserNotFound } from './errors/UserNotFound';

type UpdateUserUseCaseResponse = Promise<Either<UserNotFound, User>>;

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string, data: IUserProps): UpdateUserUseCaseResponse {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      return left(new UserNotFound());
    }

    user.name = data.name ?? user.name;
    user.email = data.email ?? user.email;
    user.password = data.password ?? user.password;

    await this.usersRepository.update(id, user);

    return right(user);
  }
}
