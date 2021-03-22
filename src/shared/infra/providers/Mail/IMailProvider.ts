import { Either } from '../../../logic/Either';
import { IMailTemplateProviderProps } from '../MailTemplate/IMailTemplateProvider';
import { MailServiceError } from './errors/MailServiceError';

interface IMailContact {
  name: string;
  address: string;
}

export interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  template: IMailTemplateProviderProps;
}

export interface IMailProvider {
  sendMail(data: ISendMail): Promise<Either<MailServiceError, boolean>>;
}
