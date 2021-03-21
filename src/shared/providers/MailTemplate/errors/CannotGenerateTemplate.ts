export class CannotGenerateTemplate extends Error {
  constructor() {
    super(`Não foi possivel gerar o template de e-mail`);
    this.message = 'CannotGenerateTemplate';
  }
}
