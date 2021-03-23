import { IMailProvider, ISendMail } from '../IMailProvider';
import sendgrid from '@sendgrid/mail';
import { mailConfig } from '../../../../../configs/mailconfig';
import { Either, left, right } from '../../../../logic/Either';
import { MailServiceError } from '../errors/MailServiceError';
import { IMailTemplateProvider } from '../../MailTemplate/IMailTemplateProvider';
import { inject, injectable } from 'tsyringe';
import { MAIL, NAME } from '../../../../utils/environments';

@injectable()
export class SendGridMailProvider implements IMailProvider {
  constructor(
    @inject('MailTemplateProvider')
    private template: IMailTemplateProvider
  ) {
    console.log(mailConfig.sendgrid.key);
    sendgrid.setApiKey(mailConfig.sendgrid.key);
  }

  async sendMail({
    to,
    from = { name: NAME, address: MAIL },
    subject,
    template,
  }: ISendMail): Promise<Either<MailServiceError, boolean>> {
    const templateOrError = await this.template.parse(template);

    if (templateOrError.isLeft()) {
      return left(templateOrError.value);
    }

    try {
      const mail = {
        to: to.address,
        from: from.address,
        subject,
        html: templateOrError.value,
      };

      await sendgrid.send(mail);

      return right(true);
    } catch (error) {
      console.log(error);
      return left(new MailServiceError(to.address));
    }
  }
}
