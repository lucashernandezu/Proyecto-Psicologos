import { Router } from 'express';
import userController from '../controllers/user.controller';
import { validate } from '../middlewares/validate.middleware';
import { registerUserSchema } from '../schemas/user.schema';

const router = Router();

router.post('/register',validate(registerUserSchema), userController.register);

export default router;
