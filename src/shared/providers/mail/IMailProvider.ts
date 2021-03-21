import { Either } from '../../logic/Either';
import { ISendMail } from './dtos/ISendMailDTO';
import { MailServiceError } from './errors/MailServiceError';

export interface IMailProvider {
  sendMail(data: ISendMail): Promise<Either<MailServiceError, boolean>>;
}
