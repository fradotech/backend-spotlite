import { ApiQueryRequest } from "../../infrastructure/api.contract";
import { Book } from "../entities/book.entity";
import { BookRepository } from "../repositories/book.repository";

export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async list(
    query?: ApiQueryRequest
  ): Promise<{ rows: Book[]; count: number }> {
    return await this.bookRepository.list(query);
  }

  async create(data: Book): Promise<Book> {
    return await this.bookRepository.create(data);
  }

  async read(id: number): Promise<Book | null> {
    return await this.bookRepository.findOneById(id, true);
  }

  async update(id: number, data: Book): Promise<Book | null> {
    await this.bookRepository.update(id, data);
    return await this.bookRepository.findOneById(id, true);
  }

  async delete(id: number): Promise<number> {
    return await this.bookRepository.delete(id);
  }
}
