import {Router} from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.js';
import { loginSchema } from '../validators/auth.validator.js';

const router = Router();

router.post('/login',validate(loginSchema), authController.login);


export default router;