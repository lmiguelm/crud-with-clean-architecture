import { IMailProvider, ISendMail } from '../IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';
import { mailConfig } from '../../../../../configs/mailconfig';
import { Either, left, right } from '../../../../logic/Either';
import { MailServiceError } from '../errors/MailServiceError';

import { NAME, MAIL } from '../../../../utils/environments';
import { inject, injectable } from 'tsyringe';
import { IMailTemplateProvider } from '../../MailTemplate/IMailTemplateProvider';

@injectable()
export class MailtrapProvider implements IMailProvider {
  private readonly transporter: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private template: IMailTemplateProvider
  ) {
    this.transporter = nodemailer.createTransport(mailConfig.mailtrap);
  }

  async sendMail({
    from = { name: NAME, address: MAIL },
    to,
    subject,
    template,
  }: ISendMail): Promise<Either<MailServiceError, boolean>> {
    const templateOrError = await this.template.parse(template);

    if (templateOrError.isLeft()) {
      return left(templateOrError.value);
    }

    try {
      await this.transporter.sendMail({
        from,
        to,
        subject,
        html: templateOrError.value,
      });
      return right(true);
    } catch (error) {
      console.log(error);
      return left(new MailServiceError(to.address));
    }
  }
}
