import express from "express";
import { OrderController } from "./controllers/order.controller";
import { OrderService } from "./services/order.service";
import { OrderRepository } from "./repositories/order.repository";
import { BookRepository } from "./repositories/book.repository";
import { bookRepository } from "./book.module";
import { userRepository } from "./user.module";

const orderRepository = new OrderRepository();

const orderService = new OrderService(orderRepository, bookRepository, userRepository);
const orderController = new OrderController(orderService);

const router = express.Router();

const indexPath = "orders";

router.get(`/${indexPath}`, orderController.list);
router.post(`/${indexPath}`, orderController.create);
router.get(`/${indexPath}/:id`, orderController.read);
// router.put(`/${indexPath}/:id`, orderController.update);
router.delete(`/${indexPath}/:id`, orderController.delete);

router.patch(`/${indexPath}/:id/status`, orderController.updateStatus);

export default router;
