import { Either } from '../../logic/Either';
import { MailServiceError } from './errors/MailServiceError';

export interface IMailProvider {
  sendMail(data: ISendMail): Promise<Either<MailServiceError, boolean>>;
}
