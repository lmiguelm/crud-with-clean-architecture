import { container } from 'tsyringe';
import { IMailProvider } from './IMailProvider';
import { MailtrapProvider } from './implementations/MailtrapProvider';
import { FakeMailProvider } from './implementations/FakeMailProvider';
import { SendGridMailProvider } from './implementations/SendGridMailProvider';

import { MAIL_PROVIDER } from '../../../utils/environments';

const providers = {
  sendgrid: SendGridMailProvider,
  mailtrap: MailtrapProvider,
  fake: FakeMailProvider,
};

container.registerSingleton<IMailProvider>('MailProvider', providers[MAIL_PROVIDER]);
