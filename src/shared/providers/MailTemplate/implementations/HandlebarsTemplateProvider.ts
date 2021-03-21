import HandleBars from 'handlebars';
import fs from 'fs';

import { CannotGenerateTemplate } from '../errors/CannotGenerateTemplate';
import { Either, left, right } from '../../../logic/Either';

import { IMailTemplateProvider } from '../IMailTemplateProvider';
import { IMailTemplateProviderProps } from '../../dtos/IMailTemplateProviderProps';

export class HandlebarsTemplateProvider implements IMailTemplateProvider {
  async parse({
    file,
    variables,
  }: IMailTemplateProviderProps): Promise<Either<CannotGenerateTemplate, string>> {
    try {
      const templateFileContent = fs.readFileSync(file).toString('utf-8');
      const mailTemplateParse = HandleBars.compile(templateFileContent);
      const html = mailTemplateParse(variables);
      return right(html);
    } catch (error) {
      console.log(error);
      left(new CannotGenerateTemplate());
    }
  }
}
