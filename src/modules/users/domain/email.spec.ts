import { Email } from './email';

describe('Testar e-mails informados', () => {
  it('Deve aceitar o e-mail válido', async () => {
    const emailOrError = await Email.create('example@example.com');
    expect(emailOrError.isRight()).toBeTruthy();
  });

  it('Deve rejeitar os e-mails inválidos', async () => {
    const emailOrError1 = await Email.create('example@.com');
    const emailOrError2 = await Email.create('@example.com');
    const emailOrError3 = await Email.create('example@example');

    expect(emailOrError1.isLeft()).toBeTruthy();
    expect(emailOrError2.isLeft()).toBeTruthy();
    expect(emailOrError3.isLeft()).toBeTruthy();
  });
});
