import { Email } from './email';
import { Name } from './name';
import { Password } from './password';
import { User } from './user';

describe('Testando a validação de dominio de usuário', () => {
  it('Deve ser capaz de criar um usuário', async () => {
    const data = {
      email: 'example@example.com',
      name: 'example',
      password: 'example12345',
    };

    const userOrError = await User.create(data);

    expect(userOrError.isRight()).toBeTruthy();
  });

  it('Deve ser capaz de invalidar um usuário invalido', async () => {
    const data = {
      email: 'example@.com',
      name: 'e',
      password: '1',
    };

    const userOrError = await User.create(data);

    expect(userOrError.isLeft()).toBeTruthy();
  });
});
