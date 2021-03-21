import { Either, left, right } from '../../../shared/logic/Either';

import { InvalidEmailError } from './errors/InvalidEmailError';
import { InvalidNameError } from './errors/InvalidNameError';
import { InvalidPasswordError } from './errors/InvalidPasswordError';

import { Name } from './name';
import { Email } from './email';
import { Password } from './password';

interface UserProps {
  email: string;
  name: string;
  password: string;
}

export class User {
  private constructor(readonly email: Email, readonly name: Name, readonly password: Password) {}

  static async create(
    user: UserProps
  ): Promise<Either<InvalidEmailError | InvalidNameError | InvalidPasswordError, User>> {
    const nameOrError = await Name.create(user.name);
    const emailOrError = await Email.create(user.email);
    const passwordOrError = await Password.create(user.password);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }
    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }
    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const name = nameOrError.value;
    const email = emailOrError.value;
    const password = passwordOrError.value;

    return right(new User(email, name, password));
  }
}
