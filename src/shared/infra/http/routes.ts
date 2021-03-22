import { Router } from 'express';

import { userRoutes } from '../../../modules/users/infra/http/routes/user.routes';
import { authRoutes } from '../../../modules/users/infra/http/routes/auth.routes';

const routes = Router();

routes.use('/api/users', userRoutes);
routes.use('/api', authRoutes);

export { routes };
