import { Either } from '../../logic/Either';
import { CompareHashError } from './errors/CompareHashError';
import { EncodeError } from './errors/EncoderError';

export interface IEncoder {
  encode(value: string): Promise<Either<EncodeError, string>>;
  compare(value: string, encode: string): Promise<Either<CompareHashError, boolean>>;
}
