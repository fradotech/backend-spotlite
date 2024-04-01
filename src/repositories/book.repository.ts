import { Op } from "sequelize";
import { ApiQueryRequest } from "../../infrastructure/api.contract";
import { BadRequestException } from "../../infrastructure/exceptions/bad-request.exception";
import { NotFoundException } from "../../infrastructure/exceptions/not-found.exception";
import { Book } from "../entities/book.entity";

export class BookRepository {
  async list(
    query?: ApiQueryRequest
  ): Promise<{ rows: Book[]; count: number }> {
    const { take, search, filterBy, filterValue } = query || {};

    if (filterBy && !Object.keys(Book.getAttributes()).includes(filterBy)) {
      throw new BadRequestException(
        `Column "${filterBy}" not found. Available columns: ${Object.keys(
          Book.getAttributes()
        ).join(", ")}`
      );
    }

    const options = {
      limit: take,
      where: {
        ...(search && {
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } },
          ],
        }),
        ...(filterBy && filterValue && { [filterBy]: filterValue }),
      },
    };

    return await Book.findAndCountAll(options);
  }

  async create(data: Book): Promise<Book> {
    try {
      return await Book.create({ ...data });
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async findOneById(
    id: number,
    isThrowException = false
  ): Promise<Book | null> {
    const user = await Book.findByPk(id);
    if (isThrowException && !user) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, data: Book): Promise<boolean> {
    const [affected] = await Book.update(data, { where: { id } });
    return affected > 0;
  }

  async delete(id: number): Promise<number> {
    await this.findOneById(id, true);
    return await Book.destroy({ where: { id } });
  }

  // === Utils === \\
}
