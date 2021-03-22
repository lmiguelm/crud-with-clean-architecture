import { authConfig } from '../../../../../../configs/auth';
import { ITokenProvider } from '../ITokenProvider';

import jwt from 'jsonwebtoken';
import { Either, left, right } from '../../../../../../shared/logic/Either';
import { TokenError } from '../errors/TokenError';

export class JwtProvider implements ITokenProvider {
  private expiresIn: string;
  private secret: string;

  constructor() {
    this.expiresIn = authConfig.expiresIn;
    this.secret = authConfig.secret;
  }

  sign(id: string, expiresIn?: string): string {
    const token = jwt.sign({ id }, this.secret, {
      expiresIn: expiresIn ?? this.expiresIn,
    });
    return `Bearer ${token}`;
  }

  verify(token: string): Either<TokenError, string | object> {
    try {
      const [type, hash] = token.split(' ');

      if (type !== 'Bearer') {
        return left(new TokenError());
      }

      const decoded: any = jwt.verify(hash, this.secret);

      return right(decoded.id);
    } catch (_) {
      return left(new TokenError());
    }
  }
}
