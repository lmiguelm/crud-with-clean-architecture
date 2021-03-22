import createConnection from '../../../../shared/infra/typeorm';
import { getConnection } from 'typeorm';

import { IUsersRepository } from '../../repositories/IUsersRepository';
import { TypeormUsersRepository } from '../../repositories/implementations/TypeormUsersRespository';
import { RemoveUserUseCase } from './RemoveUserUseCase';

let usersRepository: IUsersRepository;
let removeUser: RemoveUserUseCase;

describe('Remoção de usuário', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();

    usersRepository = new TypeormUsersRepository();
    removeUser = new RemoveUserUseCase(usersRepository);
  });

  afterAll(async () => {
    const connection = getConnection();
    connection.dropDatabase();
  });

  it('Deve remover um usuário pelo seu id', async () => {
    const user = await usersRepository.create({
      name: 'example',
      email: 'example@email.com',
      password: 'example12345',
    });

    const removeOrFail = await removeUser.execute(user.id);
    expect(removeOrFail.isRight()).toBeTruthy();
  });
});
