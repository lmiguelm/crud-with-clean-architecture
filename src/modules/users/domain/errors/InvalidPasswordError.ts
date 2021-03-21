import { IDomainError } from '../../../../shared/errors/IDomainError';

export class InvalidPasswordError extends Error implements IDomainError {
  constructor(public password: string) {
    super(`Senha inválida`);
    this.name = 'InvalidPasswordError';
  }
}
