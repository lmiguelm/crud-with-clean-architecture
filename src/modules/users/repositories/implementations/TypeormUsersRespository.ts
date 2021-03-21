import { EntityRepository, getRepository, Repository } from 'typeorm';
import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';

@EntityRepository(User)
export class TypeormUsersRepository implements IUsersRepository {
  constructor(private readonly repo = getRepository(User)) {}
}
