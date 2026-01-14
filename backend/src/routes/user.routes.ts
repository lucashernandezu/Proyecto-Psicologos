import { Router } from 'express';
import userController from '../controllers/user.controller';
import { validate } from '../middlewares/validate.middleware';
import { registerUserSchema, loginUserSchema } from '../schemas/user.schema';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', validate(registerUserSchema), userController.register);
router.post('/login', validate(loginUserSchema), userController.login);

router.get('/profile', authenticateToken, userController.getProfile);

router.get('/', authenticateToken, authorizeRoles(['ADMIN']), userController.getAllUsers);

router.get('/dashboard', authenticateToken, authorizeRoles(['ADMIN', 'PSYCHOLOGIST']), userController.getDashboard);

export default router;
