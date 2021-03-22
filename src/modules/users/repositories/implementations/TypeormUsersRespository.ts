import { EntityRepository, getRepository, Repository } from 'typeorm';
import { ICreateUserProps } from '../../dtos/ICreateUser';
import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';

@EntityRepository(User)
export class TypeormUsersRepository implements IUsersRepository {
  constructor(private readonly repo = getRepository(User)) {}

  async exists(email: string): Promise<boolean> {
    const userAlreadyExists = await this.repo.findOne({ email });

    if (userAlreadyExists) {
      return true;
    }
    return false;
  }

  async create(data: ICreateUserProps): Promise<User> {
    const user = this.repo.create(data);
    await this.repo.save(user);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repo.findOne({ email });
  }
}
