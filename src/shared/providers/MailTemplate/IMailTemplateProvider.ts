import { Either } from '../../logic/Either';
import { IMailTemplateProviderProps } from '../dtos/IMailTemplateProviderProps';
import { CannotGenerateTemplate } from './errors/CannotGenerateTemplate';

export interface IMailTemplateProvider {
  parse(data: IMailTemplateProviderProps): Promise<Either<CannotGenerateTemplate, string>>;
}
