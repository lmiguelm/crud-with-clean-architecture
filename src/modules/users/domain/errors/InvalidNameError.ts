import { IDomainError } from '../../../../shared/errors/IDomainError';

export class InvalidNameError extends Error implements IDomainError {
  constructor(public name: string) {
    super(`O nome: '${name}' é inválido.`);
    this.name = 'InvalidNameError';
  }
}
