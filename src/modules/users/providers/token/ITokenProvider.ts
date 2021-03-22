import { Either } from '../../../../shared/logic/Either';
import { TokenError } from './errors/TokenError';

export interface ITokenProvider {
  sign(id: string, expiresIn?: string): string;
  verify(token: string): Either<TokenError, string | object>;
}
