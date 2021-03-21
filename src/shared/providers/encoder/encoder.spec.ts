import { BcryptEncoder } from './implementations/BcryptEncoder';

describe('Testando a criptografia de valores com o bcrypt', () => {
  it('Deve ser possivel criptografar e comparar um valor', async () => {
    const bcrypt = new BcryptEncoder();
    const originalValue = 'teste';

    const valueEncodedOrError = await bcrypt.encode(originalValue);
    expect(valueEncodedOrError.isRight()).toBeTruthy();

    const valueEncoded = valueEncodedOrError.value as string;

    const isValue = await bcrypt.compare(originalValue, valueEncoded);
    expect(isValue.isRight()).toBeTruthy();
  });
});
