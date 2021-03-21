import { injectable, inject } from 'tsyringe';
import { Either, left, right } from '../../../../shared/logic/Either';
import { ICreateUser } from '../../dtos/ICreateUser';
import { IUsersRepository } from '../../repositories/IUsersRepository';

import { InvalidEmailError } from '../../domain/errors/InvalidEmailError';
import { InvalidNameError } from '../../domain/errors/InvalidNameError';
import { InvalidPasswordError } from '../../domain/errors/InvalidPasswordError';
import { UserAlreadyExists } from './errors/UserAlreadyExists';

import { Name } from '../../domain/name';
import { Email } from '../../domain/email';
import { Password } from '../../domain/password';
import { User } from '../../infra/typeorm/entities/User';
import { IEncoderProvider } from '../../../../shared/providers/encoder/IEnconderProvider';
import { EncodeError } from '../../../../shared/providers/encoder/errors/EncoderError';
import { IMailProvider } from '../../../../shared/providers/mail/IMailProvider';

type CreaterUserUseCaseResponse = Either<
  InvalidNameError | InvalidEmailError | InvalidPasswordError | EncodeError | UserAlreadyExists,
  User
>;

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('IEncoderProvider')
    private encoder: IEncoderProvider,

    @inject('MailProvider')
    private mailService: IMailProvider
  ) {}

  async execute(data: ICreateUser): Promise<CreaterUserUseCaseResponse> {
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

    this.mailService.sendMail({
      to: {
        name: user.name,
        address: user.email,
      },
      subject: 'Boas Vindas',
      body: `<p>Olá, ${user.name}, muito obrigado por se cadastrar em nosso sistema :D</p>`,
    });

    return right(user);
  }
}
