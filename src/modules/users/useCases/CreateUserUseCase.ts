import { injectable, inject } from 'tsyringe';
import { Either, left, right } from '../../../shared/logic/Either';
import { ICreateUser } from '../dtos/ICreateUser';
import { IUsersRepository } from '../repositories/IUsersRepository';

import { InvalidEmailError } from '../domain/errors/InvalidEmailError';
import { InvalidNameError } from '../domain/errors/InvalidNameError';
import { InvalidPasswordError } from '../domain/errors/InvalidPasswordError';
import { UserAlreadyExists } from './errors/UserAlreadyExists';

import { Name } from '../domain/name';
import { Email } from '../domain/email';
import { Password } from '../domain/password';
import { User } from '../infra/typeorm/entities/User';

type CreaterUserUseCaseResponse = Either<
  InvalidNameError | InvalidEmailError | InvalidPasswordError | UserAlreadyExists,
  User
>;

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUser): Promise<CreaterUserUseCaseResponse> {
    const nameOrError = await Name.create(data.name);
    const emailOrError = await Email.create(data.email);
    const passwordOrError = await Password.create(data.password);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const name = nameOrError.value.value;
    const email = emailOrError.value.value;
    const password = passwordOrError.value.value;

    if (await this.usersRepository.exists(email)) {
      return left(new UserAlreadyExists(email));
    }

    const user = await this.usersRepository.create({ name, email, password });

    return right(user);
  }
}
