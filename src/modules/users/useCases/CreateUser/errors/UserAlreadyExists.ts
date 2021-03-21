import { IUseCasesError } from '../../../../../shared/errors/IUseCasesError';

export class UserAlreadyExists extends Error implements IUseCasesError {
  constructor(email: string) {
    super(`Usuário com o email '${email}' já foi cadastrado em nosso sistema!`);
    this.name = 'UserAlreadyExists';
  }
}
