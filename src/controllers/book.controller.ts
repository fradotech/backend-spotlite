import { ApiResponse } from "../../infrastructure/api.contract";
import { Book } from "../entities/book.entity";
import { BookService } from "../services/book.service";
import { Request } from "express";

export class BookController {
  constructor(private readonly bookService: BookService) {}

  list = ApiResponse.tryCatch(async (req: Request) => {
    return await this.bookService.list(req.query);
  });

  create = ApiResponse.tryCatch(async (req: Request): Promise<Book> => {
    return await this.bookService.create(req.body);
  });

  read = ApiResponse.tryCatch(async (req: Request): Promise<Book | null> => {
    return await this.bookService.read(+req.params.id);
  });

  update = ApiResponse.tryCatch(async (req: Request): Promise<Book | null> => {
    return await this.bookService.update(+req.params.id, req.body);
  });

  delete = ApiResponse.tryCatch(async (req: Request): Promise<number> => {
    return await this.bookService.delete(+req.params.id);
  });
}
