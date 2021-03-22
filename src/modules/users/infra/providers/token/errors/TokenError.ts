export class TokenError extends Error {
  constructor() {
    super('Token inválido!');
    this.message = 'TokenError';
  }
}
