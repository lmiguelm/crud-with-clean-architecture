import { container } from 'tsyringe';
import { TypeormUsersRepository } from '../repositories/implementations/TypeormUsersRespository';
import { IUsersRepository } from '../repositories/IUsersRepository';

import '../infra/providers/index';

container.registerSingleton<IUsersRepository>('UsersRepository', TypeormUsersRepository);
