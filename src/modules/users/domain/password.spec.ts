import { Password } from './password';

describe('Testar nomes informados', () => {
  it('Deve validar uma senha valida', async () => {
    const passwordOrError = await Password.create('example12345');
    expect(passwordOrError.isRight()).toBeTruthy();
  });

  it('Deve invalidar senha com tamanho menor que 5', async () => {
    const passwordOrError = await Password.create('1234');
    expect(passwordOrError.isLeft()).toBeTruthy();
  });

  it('Deve rejeitar senha com tamanho maior que 255', async () => {
    const passwordOrError = await Password.create('1'.repeat(260));
    expect(passwordOrError.isLeft()).toBeTruthy();
  });
});
