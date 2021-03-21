import { Router } from 'express';
import { userRoutes } from '../../../modules/users/infra/http/user.routes';

const routes = Router();

routes.use('/users', userRoutes);

export { routes };
