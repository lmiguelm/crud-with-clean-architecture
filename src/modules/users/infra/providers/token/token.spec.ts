import { JwtProvider } from './implementations/JwtProvider';
import { v4 as uuid } from 'uuid';

import * as sinon from 'sinon';
import { TokenExpiredError } from 'jsonwebtoken';

let jwt: JwtProvider;

describe('Gerenciamento de token', () => {
  beforeAll(() => {
    jwt = new JwtProvider();
  });

  it('Deve gerar um token válido', () => {
    const id = uuid();

    const token = jwt.sign(id);
    const isValidTokenOrError = jwt.verify(token);

    expect(token).not.toEqual(id);
    expect(isValidTokenOrError.isRight()).toBeTruthy();
  });

  it('Deve invalidar um token invalido', () => {
    const id = uuid();
    const isValidTokenOrError = jwt.verify(id);
    expect(isValidTokenOrError.isLeft()).toBeTruthy();
  });
});
