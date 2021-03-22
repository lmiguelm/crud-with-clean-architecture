import { Router } from 'express';
import { container } from 'tsyringe';

import { EnsureAuthenticatedMiddleware } from '../middlewares/EnsureAuthenticatedMiddleware';
import { createUserController } from '../controllers/CreateUserController';
import { updateUserController } from '../controllers/UpdateUserController';

const ensureAuthenticated = container.resolve(EnsureAuthenticatedMiddleware);

const userRoutes = Router();

userRoutes.post('/', createUserController.handle);

userRoutes.put(
  '/',
  (req, res, next) => ensureAuthenticated.execute(req, res, next),
  updateUserController.handle
);

export { userRoutes };
