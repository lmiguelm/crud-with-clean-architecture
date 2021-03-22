import createConnection from '../../../../shared/infra/typeorm';
import { getConnection } from 'typeorm';

import { IUsersRepository } from '../../repositories/IUsersRepository';
import { TypeormUsersRepository } from '../../repositories/implementations/TypeormUsersRespository';
import { ListUserUseCase } from './ListUserUseCase';
import { User } from '../../infra/typeorm/entities/User';

let listUser: ListUserUseCase;
let usersRepository: IUsersRepository;

describe('Atualização de usuário', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();

    usersRepository = new TypeormUsersRepository();
    listUser = new ListUserUseCase(usersRepository);
  });

  afterAll(async () => {
    const connection = getConnection();
    connection.dropDatabase();
  });

  it('Deve ser capaz de retornar os dados do usuário a patir de seu id', async () => {
    const user = await usersRepository.create({
      name: 'example',
      email: 'example@email.com',
      password: 'example12345',
    });

    const userData = await listUser.execute(user.id);
    expect(userData).toEqual(user);
  });
});
