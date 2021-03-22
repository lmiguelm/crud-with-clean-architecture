import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';

const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authRoutes.post('/login', authenticateUserController.handle);

export { authRoutes };
