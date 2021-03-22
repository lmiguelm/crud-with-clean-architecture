import { IUseCasesError } from '../../../../../shared/errors/IUseCasesError';

export class UserNotFound extends Error implements IUseCasesError {
  constructor() {
    super(`Usuário não encontrado.`);
    this.message = 'UserNotFound';
  }
}
