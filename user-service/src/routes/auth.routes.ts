import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.js';
import { loginSchema } from '../validators/auth.validator.js';
import { refreshSchema } from '../validators/refresh.validator.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', validate(loginSchema), authController.login);
router.post("/refresh", validate(refreshSchema), authController.refresh);
router.post("/logout", authenticate, authController.logout);
export default router;