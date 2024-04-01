import express from "express";
import { BookController } from "./controllers/book.controller";
import { BookService } from "./services/book.service";
import { BookRepository } from "./repositories/book.repository";

const bookRepository = new BookRepository();

const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

const router = express.Router();

const indexPath = "books";

router.get(`/${indexPath}`, bookController.list);
router.post(`/${indexPath}`, bookController.create);
router.get(`/${indexPath}/:id`, bookController.read);
router.put(`/${indexPath}/:id`, bookController.update);
router.delete(`/${indexPath}/:id`, bookController.delete);

export default router;
