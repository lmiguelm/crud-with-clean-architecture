import { getConnection } from 'typeorm';
import createConnection from '../../../../shared/infra/typeorm';

import { IEncoderProvider } from '../../../../shared/infra/providers/Encoder/IEnconderProvider';
import { BcryptEncoder } from '../../../../shared/infra/providers/Encoder/implementations/BcryptEncoder';
import { IMailProvider } from '../../../../shared/infra/providers/Mail/IMailProvider';
import { FakeMailProvider } from '../../../../shared/infra/providers/Mail/implementations/FakeMailProvider';
import { TypeormUsersRepository } from '../../repositories/implementations/TypeormUsersRespository';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { ITokenProvider } from '../../infra/providers/token/ITokenProvider';
import { JwtProvider } from '../../infra/providers/token/implementations/JwtProvider';

let authenticateUser: AuthenticateUserUseCase;
let userRepository: IUsersRepository;
let createUser: CreateUserUseCase;
let encoder: IEncoderProvider;
let mailService: IMailProvider;
let tokenManager: ITokenProvider;

describe('Autenticação de usuário', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();

    userRepository = new TypeormUsersRepository();
    encoder = new BcryptEncoder();
    tokenManager = new JwtProvider();
    mailService = new FakeMailProvider();

    authenticateUser = new AuthenticateUserUseCase(userRepository, encoder, tokenManager);
    createUser = new CreateUserUseCase(userRepository, encoder, mailService);

    const user = {
      name: 'example@example',
      email: 'example@example.com',
      password: 'example12345',
    };

    await createUser.execute(user);
  });

  afterAll(async () => {
    const connection = getConnection();
    connection.dropDatabase();
  });

  it('Deve ser capaz de autenticar um usuário e retornar um token', async () => {
    const data = {
      email: 'example@example.com',
      password: 'example12345',
    };

    const authenticateOrError = await authenticateUser.execute(data);

    expect(authenticateOrError.isRight()).toBeTruthy();
    expect(authenticateOrError.value).toHaveProperty('token');
  });

  it('Deve ser capaz de invalidar os dados de request', async () => {
    const data = {
      email: 'e@example.com',
      password: 'e',
    };

    const authenticateOrError = await authenticateUser.execute(data);

    expect(authenticateOrError.isLeft()).toBeTruthy();
  });
});
