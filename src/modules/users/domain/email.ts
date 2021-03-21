import * as yup from 'yup';
import { Either, left, right } from '../../../shared/logic/Either';
import { InvalidEmailError } from './errors/InvalidEmailError';

export class Email {
  private constructor(private readonly email: string) {}

  get value(): string {
    return this.email;
  }

  static async validate(email: string): Promise<boolean> {
    const scheme = yup.string().email().required().max(255);
    return await scheme.isValid(email);
  }

  static async create(email: string): Promise<Either<InvalidEmailError, Email>> {
    if (await this.validate(email)) {
      return right(new Email(email));
    }
    return left(new InvalidEmailError(`O E-mail informado é inválido`));
  }
}
