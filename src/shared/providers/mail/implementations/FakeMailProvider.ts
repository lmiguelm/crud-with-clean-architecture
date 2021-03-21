import { Either, right } from '../../../logic/Either';
import { MailServiceError } from '../errors/MailServiceError';
import { IMailProvider } from '../IMailProvider';

export class FakeMailProvider implements IMailProvider {
  async sendMail(_: ISendMail): Promise<Either<MailServiceError, boolean>> {
    return right(true);
  }
}
