import { container } from 'tsyringe';
import { IMailProvider } from './IMailProvider';
import { MailtrapProvider } from './implementations/MailtrapProvider';
import { FakeMailProvider } from './implementations/FakeMailProvider';

import { MAIL_PROVIDER } from '../../../utils/environments';

const providers = {
  mailtrap: MailtrapProvider,
  fake: FakeMailProvider,
};

container.registerSingleton<IMailProvider>('MailProvider', providers[MAIL_PROVIDER]);
