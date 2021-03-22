import { IUserProps } from '../dtos/IUser';
import { User } from '../infra/typeorm/entities/User';

export interface IUsersRepository {
  exists(email: string): Promise<boolean>;
  create(data: IUserProps): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  update(id: string, data?: IUserProps): Promise<void>;
}
