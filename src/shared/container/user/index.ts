import { container } from 'tsyringe';
import { TypeormUsersRepository } from '../../../modules/users/repositories/implementations/TypeormUsersRespository';
import { IUsersRepository } from '../../../modules/users/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', TypeormUsersRepository);
