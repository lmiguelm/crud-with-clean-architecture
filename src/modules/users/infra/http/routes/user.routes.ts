import { Router } from 'express';
import { container } from 'tsyringe';

import { EnsureAuthenticatedMiddleware } from '../middlewares/EnsureAuthenticatedMiddleware';
import { createUserController } from '../controllers/CreateUserController';
import { updateUserController } from '../controllers/UpdateUserController';
import { listUserController } from '../controllers/ListUserController';
import { removeUserController } from '../controllers/RemoveUserController';

const ensureAuthenticated = container.resolve(EnsureAuthenticatedMiddleware);

const userRoutes = Router();

userRoutes.post('/', createUserController.handle);

userRoutes.get(
  '/',
  (req, res, next) => ensureAuthenticated.execute(req, res, next),
  listUserController.handle
);

userRoutes.put(
  '/',
  (req, res, next) => ensureAuthenticated.execute(req, res, next),
  updateUserController.handle
);

userRoutes.delete(
  '/',
  (req, res, next) => ensureAuthenticated.execute(req, res, next),
  removeUserController.handle
);

export { userRoutes };
