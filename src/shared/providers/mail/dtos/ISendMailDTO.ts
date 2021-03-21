interface IMailContact {
  name: string;
  address: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  body: string;
}
