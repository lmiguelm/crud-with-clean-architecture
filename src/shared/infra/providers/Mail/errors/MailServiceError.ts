export class MailServiceError extends Error {
  constructor(email: string) {
    super(`Não foi possível enviar e-mail para ${email}`);
  }
}
