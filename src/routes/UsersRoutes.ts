import { Router } from "express";
import userController from "../controllers/UsersController";

const router = Router();

router.post("/users", userController.createUser);
router.get("/users", userController.getUsers);
router.get("/users/:user_id", userController.getUserById);
router.put("/users/:user_id", userController.updateUser);
router.patch("/users/:id_comment", userController.partialUpdateUser as any);
router.delete("/users/:user_id", userController.deleteUser);
router.delete("/usersdeleteAll", userController.deleteAllData);

export default router;