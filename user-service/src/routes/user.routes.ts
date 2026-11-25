import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { createUserSchema, updateUserSchema, userIdSchema } from "../validators/user.validator.js";

import * as userController from "../controllers/user.controller.js";

const router = Router();

router.post("/", validate(createUserSchema), userController.createUser);
router.patch("/:id", validate(userIdSchema, "params"), validate(updateUserSchema, "body"), userController.updateUser);
router.delete("/:id", validate(userIdSchema, "params"), userController.deleteUser);
router.get("/", userController.getAllUsers);
router.get("/:id", validate(userIdSchema, "params"), userController.getUserById);

export default router;