import { IDomainError } from '../../../../shared/errors/IDomainError';

export class InvalidEmailError extends Error implements IDomainError {
  constructor(public email: string) {
    super(`Email: '${email}' é inválido.`);
    this.name = 'InvalidEmailError';
  }
}
