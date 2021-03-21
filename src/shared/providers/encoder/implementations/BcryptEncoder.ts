import bcrypt from 'bcrypt';
import { Either, left, right } from '../../../logic/Either';
import { EncodeError } from '../errors/EncoderError';
import { CompareHashError } from '../errors/CompareHashError';
import { IEncoderProvider } from '../IEnconderProvider';

export class BcryptEncoder implements IEncoderProvider {
  async encode(value: string): Promise<Either<EncodeError, string>> {
    try {
      const valueEncoded = await bcrypt.hash(value, bcrypt.genSaltSync());
      return right(valueEncoded);
    } catch (error) {
      console.log(error);
      return left(new EncodeError(value));
    }
  }
  async compare(value: string, hash: string): Promise<Either<CompareHashError, boolean>> {
    try {
      return right(await bcrypt.compare(value, hash));
    } catch (error) {
      console.log(error);
      return left(new CompareHashError(value, hash));
    }
  }
}
