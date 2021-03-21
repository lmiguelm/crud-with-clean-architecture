import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post('/', createUserController.handle);

export { userRoutes };
