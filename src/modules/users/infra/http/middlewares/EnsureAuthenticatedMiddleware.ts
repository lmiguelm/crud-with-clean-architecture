import { inject, injectable } from 'tsyringe';
import { ITokenProvider } from '../../providers/token/ITokenProvider';
import { Request, Response, NextFunction } from 'express';
import { JwtProvider } from '../../providers/token/implementations/JwtProvider';

interface IVerifyTokenResponse {
  iat: number;
  exp: number;
  id: string;
}

@injectable()
export class EnsureAuthenticatedMiddleware {
  constructor(
    @inject('TokenProvider')
    private tokenManager: ITokenProvider
  ) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    const hasToken = req.headers.authorization;

    if (!hasToken) {
      return res.status(401).json({ error: 'Nenhum token informado' });
    }

    const isValidTokenOrError = this.tokenManager.verify(hasToken);

    if (isValidTokenOrError.isLeft()) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    const { id } = isValidTokenOrError.value as IVerifyTokenResponse;

    req.user = {
      id,
    };

    return next();
  }
}
