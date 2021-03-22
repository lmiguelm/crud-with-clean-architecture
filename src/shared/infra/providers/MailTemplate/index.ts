import { container } from 'tsyringe';

import { IMailTemplateProvider } from './IMailTemplateProvider';
import { HandlebarsTemplateProvider } from './implementations/HandlebarsTemplateProvider';

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsTemplateProvider
);
