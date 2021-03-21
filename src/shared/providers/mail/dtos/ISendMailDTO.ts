import { IMailTemplateProviderProps } from '../../dtos/IMailTemplateProviderProps';

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
