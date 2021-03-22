import { IUseCasesError } from '../../../../../shared/errors/IUseCasesError';

export class InvalidEmailOrPassword extends Error implements IUseCasesError {
  constructor() {
    super(`E-mail ou senha inválidos!`);
    this.name = 'InvalidEmailOrPassword';
  }
}
