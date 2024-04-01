import { Op } from "sequelize";
import { ApiQueryRequest } from "../../infrastructure/api.contract";
import { BadRequestException } from "../../infrastructure/exceptions/bad-request.exception";
import { NotFoundException } from "../../infrastructure/exceptions/not-found.exception";
import { Book } from "../entities/book.entity";

export class BookRepository {
  async list(
    query?: ApiQueryRequest
  ): Promise<{ rows: Book[]; count: number }> {
    const { take, search, filterBy, filterValue, filterValues } = query || {};

    if (filterBy && !Object.keys(Book.getAttributes()).includes(filterBy)) {
      throw new BadRequestException(
        `Column "${filterBy}" not found. Available columns: ${Object.keys(
          Book.getAttributes()
        ).join(", ")}`
      );
    }

    console.log("DATA", filterBy, filterValues);

    const options = {
      limit: take,
      where: {
        ...(search && {
          [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },
            { writerName: { [Op.iLike]: `%${search}%` } },
          ],
        }),
        ...(filterBy && filterValue && { [filterBy]: filterValue }),
        ...(filterBy &&
          filterValues && { [filterBy]: { [Op.overlap]: filterValues } }),
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

  async findOneById(id: number, isThrowException = false): Promise<Book> {
    const data = await Book.findByPk(id);
    if (isThrowException && !data) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return data || new Book();
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
