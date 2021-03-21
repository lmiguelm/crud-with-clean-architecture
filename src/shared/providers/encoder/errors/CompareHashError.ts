import { IEncoderError } from '../../../errors/IEconderError';

export class CompareHashError extends Error implements IEncoderError {
  constructor(value: string, hash: string) {
    super(`Não foi possível comparar os valores informados!`);
    this.name = 'CompareHashError';
  }
}
