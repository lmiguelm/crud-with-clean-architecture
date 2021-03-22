import { getConnection } from 'typeorm';
import { IEncoderProvider } from '../../../../shared/infra/providers/Encoder/IEnconderProvider';
import { BcryptEncoder } from '../../../../shared/infra/providers/Encoder/implementations/BcryptEncoder';
import createConnection from '../../../../shared/infra/typeorm';

import { TypeormUsersRepository } from '../../repositories/implementations/TypeormUsersRespository';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { CreateUserUseCase } from './CreateUserUseCase';
import { UserAlreadyExists } from './errors/UserAlreadyExists';
import { IMailProvider } from '../../../../shared/infra/providers/Mail/IMailProvider';
import { FakeMailProvider } from '../../../../shared/infra/providers/Mail/implementations/FakeMailProvider';

let repository: IUsersRepository;
let createUser: CreateUserUseCase;
let encoderProvider: IEncoderProvider;
let mailProvider: IMailProvider;

describe('Criação de novos usuários', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();

    repository = new TypeormUsersRepository();
    encoderProvider = new BcryptEncoder();
    mailProvider = new FakeMailProvider();
    createUser = new CreateUserUseCase(repository, encoderProvider, mailProvider);
  });

  afterAll(async () => {
    const connection = getConnection();
    connection.dropDatabase();
  });

  it('Deve retornar uma exceção de dados inválidos', async () => {
    const user = {
      name: 'Miguel',
      email: 'miguel2@',
      password: '145',
    };

    const userOrError = await createUser.execute(user);

    expect(userOrError.isLeft()).toBeTruthy();
  });

  it('Deve retornar uma exceção de usuário já cadastrado', async () => {
    const user = {
      name: 'Miguel',
      email: 'miguel2@gmail.com',
      password: '12345',
    };

    await createUser.execute(user);
    const userOrError = await createUser.execute(user);

    expect(userOrError.isLeft()).toBeTruthy();
    expect(userOrError.value).toEqual(new UserAlreadyExists(user.email));
  });

  it('Deve ser capaz de criar um novo usuário', async () => {
    const user = {
      name: 'Miguel',
      email: 'miguel@gmail.com',
      password: '12345',
    };
    const userOrError = await createUser.execute(user);

    expect(await repository.exists(user.email)).toBeTruthy();
    expect(userOrError.isRight()).toBeTruthy();
  });
});
