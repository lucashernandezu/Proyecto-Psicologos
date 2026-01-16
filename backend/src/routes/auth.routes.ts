import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { forgotPasswordSchema, resetPasswordSchema } from "../schemas/auth.schema";

const router = Router()

router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword)
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword)


export default router;