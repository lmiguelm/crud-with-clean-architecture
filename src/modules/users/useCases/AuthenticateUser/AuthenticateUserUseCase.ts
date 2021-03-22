import { inject, injectable } from 'tsyringe';
import { Either, left, right } from '../../../../shared/logic/Either';
import { IEncoderProvider } from '../../../../shared/infra/providers/Encoder/IEnconderProvider';
import { IAthenticateUserProps, IAuthenticateUserResponse } from '../../dtos/IAuthenticateUser';
import { ITokenProvider } from '../../infra/providers/token/ITokenProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { InvalidEmailOrPassword } from './errors/InvalidEmailOrPassword';

type AuthenticateUserUseCaseResponse = Promise<
  Either<InvalidEmailOrPassword, IAuthenticateUserResponse>
>;

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('EncoderProvider')
    private encoderProvider: IEncoderProvider,

    @inject('TokenProvider')
    private tokenManager: ITokenProvider
  ) {}

  async execute({ email, password }: IAthenticateUserProps): AuthenticateUserUseCaseResponse {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new InvalidEmailOrPassword());
    }

    const isPasswordOrError = await this.encoderProvider.compare(password, user.password);

    if (isPasswordOrError.isLeft()) {
      return left(new InvalidEmailOrPassword());
    }

    const token = this.tokenManager.sign(user.id);

    return right({ token });
  }
}
