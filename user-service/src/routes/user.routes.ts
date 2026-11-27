import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import {authenticate} from "../middlewares/auth.middleware.js"; 
import { createUserSchema, updateUserSchema, userIdSchema } from "../validators/user.validator.js";

import * as userController from "../controllers/user.controller.js";

const router = Router();

router.post("/", validate(createUserSchema), userController.createUser);
router.get("/", authenticate, userController.getAllUsers);
router.get("/:id", authenticate, validate(userIdSchema, "params"), userController.getUserById);
router.patch("/:id", authenticate, validate(userIdSchema, "params"), validate(updateUserSchema, "body"), userController.updateUser);
router.delete("/:id", authenticate, validate(userIdSchema, "params"), userController.deleteUser);

export default router;