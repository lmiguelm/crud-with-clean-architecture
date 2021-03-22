import { EntityRepository, getRepository, Repository } from 'typeorm';
import { IUserProps } from '../../dtos/IUser';
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

  async create(data: IUserProps): Promise<User> {
    const user = this.repo.create(data);
    await this.repo.save(user);
    return user;
  }

  async update(id: string, { email, password, name }: IUserProps): Promise<void> {
    await this.repo.update(id, { email, password, name });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repo.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    return await this.repo.findOne({ id });
  }
}
