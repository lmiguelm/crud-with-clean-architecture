import { FakeMailProvider } from './implementations/FakeMailProvider';
import { MailtrapProvider } from './implementations/MailtrapProvider';

describe('Envio de e-mails', () => {
  it('Deve ser capaz de enviar e-mails com o utilizando mailtrap', async () => {
    const mail = new MailtrapProvider();

    const sendMailOrError = await mail.sendMail({
      to: {
        address: 'example@example.com',
        name: 'example',
      },
      subject: 'Example',
      body: '<h1>E-mail de teste</h1>',
    });

    expect(sendMailOrError.isRight()).toBeTruthy();
  });

  it('Deve ser capaz de enviar e-mails com o utilizando mock', async () => {
    const mail = new FakeMailProvider();

    const sendMailOrError = await mail.sendMail({
      to: {
        address: 'example@example.com',
        name: 'example',
      },
      subject: 'Example',
      body: '<h1>E-mail de teste</h1>',
    });

    expect(sendMailOrError.isRight()).toBeTruthy();
  });
});
