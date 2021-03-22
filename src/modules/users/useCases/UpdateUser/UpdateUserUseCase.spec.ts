import createConnection from '../../../../shared/infra/typeorm';
import { getConnection } from 'typeorm';

import { UpdateUserUseCase } from './UpdateUserUseCase';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { TypeormUsersRepository } from '../../repositories/implementations/TypeormUsersRespository';
import { UserNotFound } from './errors/UserNotFound';

let updateUser: UpdateUserUseCase;
let usersRepository: IUsersRepository;

describe('Atualização de usuário', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();

    usersRepository = new TypeormUsersRepository();
    updateUser = new UpdateUserUseCase(usersRepository);
  });

  afterAll(async () => {
    const connection = getConnection();
    connection.dropDatabase();
  });

  it('Deve retornar um erro de usuário não encontrado', async () => {
    const id = 'abcuusahduashdu';
    const data = {
      name: 'example',
      email: 'example@example.com',
      password: 'example12345',
    };

    const userOrError = await updateUser.execute(id, data);

    expect(userOrError.isLeft()).toBeTruthy();
    expect(userOrError.value).toBeInstanceOf(UserNotFound);
  });

  it('Deve atualizar um usuário', async () => {
    const oldData = {
      name: 'example',
      email: 'example@example.com',
      password: 'example12345',
    };

    const { id } = await usersRepository.create(oldData);

    const newData = {
      name: 'example123',
      email: 'example@example123.com',
      password: 'example12121212',
    };

    const userOrError = await updateUser.execute(id, newData);

    expect(userOrError.isRight()).toBeTruthy();
    expect(userOrError.value).toHaveProperty('id');
  });
});
