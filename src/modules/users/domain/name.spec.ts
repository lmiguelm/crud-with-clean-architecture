import { Name } from './name';

describe('Testar nomes informados', () => {
  it('Deve aceitar um nome válido', async () => {
    const nameOrError = await Name.create('example');
    expect(nameOrError.isRight()).toBeTruthy();
  });

  it('Deve rejeitar nome com tamanho menor que 5', async () => {
    const nameOrError = await Name.create('exa');
    expect(nameOrError.isLeft()).toBeTruthy();
  });

  it('Deve rejeitar nome com tamanho maior que 255', async () => {
    const nameOrError = await Name.create('a'.repeat(260));
    expect(nameOrError.isLeft()).toBeTruthy();
  });
});
