import { getConnection } from 'typeorm';
import createConnection from '../../../shared/infra/typeorm';

import { TypeormUsersRepository } from '../repositories/implementations/TypeormUsersRespository';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { CreateUserUseCase } from './CreateUserUseCase';
import { UserAlreadyExists } from './errors/UserAlreadyExists';

let repository: IUsersRepository;
let createUser: CreateUserUseCase;

describe('Criação de novos usuários', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();

    repository = new TypeormUsersRepository();
    createUser = new CreateUserUseCase(repository);
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

    console.log(userOrError.value);
    expect(await repository.exists(user.email)).toBeTruthy();
    expect(userOrError.isRight()).toBeTruthy();
  });
});
