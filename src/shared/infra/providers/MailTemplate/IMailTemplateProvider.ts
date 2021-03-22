import { Either } from '../../../logic/Either';
import { CannotGenerateTemplate } from './errors/CannotGenerateTemplate';

interface ITemplateVariables {
  [key: string]: string | number;
}

export interface IMailTemplateProviderProps {
  file: string;
  variables: ITemplateVariables;
}

export interface IMailTemplateProvider {
  parse(data: IMailTemplateProviderProps): Promise<Either<CannotGenerateTemplate, string>>;
}
