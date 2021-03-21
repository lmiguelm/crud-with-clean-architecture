import { IMailProvider } from '../IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';
import { mailConfig } from '../../../../configs/mailconfig';
import { Either, left, right } from '../../../logic/Either';
import { MailServiceError } from '../errors/MailServiceError';

import { NAME, MAIL } from '../../../utils/environments';

export class MailtrapProvider implements IMailProvider {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(mailConfig.mailtrap);
  }

  async sendMail({
    from = { name: NAME, address: MAIL },
    to,
    subject,
    body,
  }: ISendMail): Promise<Either<MailServiceError, boolean>> {
    try {
      await this.transporter.sendMail({
        from,
        to,
        subject,
        html: body,
      });
      return right(true);
    } catch (error) {
      console.log(error);
      return left(new MailServiceError(to.address));
    }
  }
}
