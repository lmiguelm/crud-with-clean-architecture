import * as yup from 'yup';
import { Either, left, right } from '../../../shared/logic/Either';
import { InvalidNameError } from './errors/InvalidNameError';

export class Name {
  private constructor(private readonly name: string) {}

  get value(): string {
    return this.name;
  }

  static async validate(name: string): Promise<boolean> {
    const scheme = yup.string().required().min(5).max(255);
    return await scheme.isValid(name);
  }

  static async create(name: string): Promise<Either<InvalidNameError, Name>> {
    if (await this.validate(name)) {
      return right(new Name(name));
    }
    return left(new InvalidNameError('Nome invalido'));
  }
}
