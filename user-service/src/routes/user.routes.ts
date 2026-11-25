import {Router} from "express";
import {validate} from "../middlewares/validate.js";
import {createUserSchema, updateUserSchema} from "../validators/user.validator.js";

import * as userController from "../controllers/user.controller.js";

const router = Router();

router.post("/",validate(createUserSchema), userController.createUser); 
router.patch(":id", validate(updateUserSchema), userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

export default router;