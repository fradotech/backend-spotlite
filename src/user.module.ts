import express from "express";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { UserRepository } from "./repositories/user.repository";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router = express.Router();

router.get("/users", userController.list);
router.post("/users", userController.create);
router.get("/users/:id", userController.read);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

export default router;