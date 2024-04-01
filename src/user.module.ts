import express from "express";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { UserRepository } from "./repositories/user.repository";
import { UserAuthService } from "./services/user-auth.service";
import { UserAuthController } from "./controllers/user-auth.controller";

export const userRepository = new UserRepository();

const userService = new UserService(userRepository);
const userController = new UserController(userService);

const userAuthService = new UserAuthService(userRepository);
const userAuthController = new UserAuthController(userAuthService);

const router = express.Router();

const indexPath = "users";

router.get(`/${indexPath}/account`, userAuthController.account);

router.get(`/${indexPath}`, userController.list);
router.post(`/${indexPath}`, userController.create);
router.get(`/${indexPath}/:id`, userController.read);
router.put(`/${indexPath}/:id`, userController.update);
router.delete(`/${indexPath}/:id`, userController.delete);

router.post(`/${indexPath}/register`, userAuthController.register);
router.post(`/${indexPath}/login`, userAuthController.login);

export default router;
