import { Router } from 'express';

import { userRoutes } from '../../../modules/users/infra/http/user.routes';
import { authRoutes } from '../../../modules/users/infra/http/auth.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);

export { routes };
