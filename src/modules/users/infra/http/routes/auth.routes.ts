import { Router } from 'express';
import { authenticateUserController } from '../controllers/AuthenticateUserController';

const authRoutes = Router();

authRoutes.post('/authenticate', authenticateUserController.handle);

export { authRoutes };
