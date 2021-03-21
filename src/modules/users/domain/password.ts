import * as yup from 'yup';
import bcrypt from 'bcrypt';

import { Either, left, right } from '../../../shared/logic/Either';
import { InvalidPasswordError } from './errors/InvalidPasswordError';

export class Password {
  private constructor(private readonly password: string) {}

  get value(): string {
    return this.password;
  }

  static async validate(password: string): Promise<boolean> {
    const scheme = yup.string().min(5).max(255).required();
    return await scheme.isValid(password);
  }

  static async gethashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, bcrypt.genSaltSync());
  }

  static async comparePassword(passwordClear: string, passwordEncrypted: string): Promise<boolean> {
    return await bcrypt.compare(passwordClear, passwordEncrypted);
  }

  static async create(password: string): Promise<Either<InvalidPasswordError, Password>> {
    if (await this.validate(password)) {
      return right(new Password(await this.gethashedPassword(password)));
    }
    return left(new InvalidPasswordError('Senha incorreta!'));
  }
}
