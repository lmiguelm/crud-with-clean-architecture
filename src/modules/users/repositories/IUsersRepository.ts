import { ICreateUser } from '../dtos/ICreateUser';
import { User } from '../infra/typeorm/entities/User';

export interface IUsersRepository {
  exists(email: string): Promise<boolean>;
  create(data: ICreateUser): Promise<User>;
}
