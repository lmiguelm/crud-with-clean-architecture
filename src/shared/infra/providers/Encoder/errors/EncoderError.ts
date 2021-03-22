import { IEncoderError } from '../../../../errors/IEconderError';

export class EncodeError extends Error implements IEncoderError {
  constructor(value: string) {
    super(`Não foi possível criptografar o valor informado!`);
    this.name = 'EncodeError';
  }
}
