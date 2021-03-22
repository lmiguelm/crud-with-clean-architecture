import { inject, injectable } from 'tsyringe';
import { Either, left, right } from '../../../../shared/logic/Either';
import { IUsersRepository } from '../../repositories/IUsersRepository';

type RemoveUserUseCaseResponse = Promise<Either<Error, boolean>>;

@injectable()
export class RemoveUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): RemoveUserUseCaseResponse {
    const userHasBeenRemoved = await this.usersRepository.delete(id);

    if (!userHasBeenRemoved) {
      return left(new Error('Não foi possível remover'));
    }

    return right(true);
  }
}
