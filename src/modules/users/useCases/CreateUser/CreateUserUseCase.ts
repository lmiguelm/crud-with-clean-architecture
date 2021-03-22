import { injectable, inject } from 'tsyringe';
import { Either, left, right } from '../../../../shared/logic/Either';
import { ICreateUserProps } from '../../dtos/ICreateUser';
import { IUsersRepository } from '../../repositories/IUsersRepository';

import { InvalidEmailError } from '../../domain/errors/InvalidEmailError';
import { InvalidNameError } from '../../domain/errors/InvalidNameError';
import { InvalidPasswordError } from '../../domain/errors/InvalidPasswordError';
import { UserAlreadyExists } from './errors/UserAlreadyExists';

import { Name } from '../../domain/name';
import { Email } from '../../domain/email';
import { Password } from '../../domain/password';
import { User } from '../../infra/typeorm/entities/User';
import { IEncoderProvider } from '../../../../shared/providers/Encoder/IEnconderProvider';
import { EncodeError } from '../../../../shared/providers/Encoder/errors/EncoderError';
import { IMailProvider } from '../../../../shared/providers/Mail/IMailProvider';

import path from 'path';

type CreaterUserUseCaseResponse = Promise<
  Either<
    InvalidNameError | InvalidEmailError | InvalidPasswordError | EncodeError | UserAlreadyExists,
    User
  >
>;

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('EncoderProvider')
    private encoder: IEncoderProvider,

    @inject('MailProvider')
    private mailService: IMailProvider
  ) {}

  async execute(data: ICreateUserProps): CreaterUserUseCaseResponse {
    const nameOrError = await Name.create(data.name);
    const emailOrError = await Email.create(data.email);
    const passwordOrError = await Password.create(data.password);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const name = nameOrError.value.value;
    const email = emailOrError.value.value;
    let password = passwordOrError.value.value;

    const passwordHashOrError = await this.encoder.encode(password);

    if (passwordHashOrError.isLeft()) {
      return left(passwordHashOrError.value);
    }

    password = passwordHashOrError.value;

    if (await this.usersRepository.exists(email)) {
      return left(new UserAlreadyExists(email));
    }

    const user = await this.usersRepository.create({ name, email, password });

    const file = path.resolve(__dirname, '..', '..', 'views', 'wellcome.hbs');

    const sendMailOrError = await this.mailService.sendMail({
      to: {
        name: user.name,
        address: user.email,
      },
      subject: '🎉 Boas Vindas 🎉',
      template: {
        file,
        variables: {
          name: user.name,
        },
      },
    });

    if (sendMailOrError.isLeft()) {
      return left(sendMailOrError.value);
    }

    return right(user);
  }
}
