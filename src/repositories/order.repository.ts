import { Op } from "sequelize";
import { ApiQueryRequest } from "../../infrastructure/api.contract";
import { BadRequestException } from "../../infrastructure/exceptions/bad-request.exception";
import { NotFoundException } from "../../infrastructure/exceptions/not-found.exception";
import { Order } from "../entities/order.entity";
import { Book } from "../entities/book.entity";

export class OrderRepository {
  async list(
    query?: ApiQueryRequest
  ): Promise<{ rows: Order[]; count: number }> {
    const { take, search, filterBy, filterValue } = query || {};

    if (filterBy && !Object.keys(Order.getAttributes()).includes(filterBy)) {
      throw new BadRequestException(
        `Column "${filterBy}" not found. Available columns: ${Object.keys(
          Order.getAttributes()
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
      include: [{ model: Book, as: "book" }],
    };

    return await Order.findAndCountAll(options);
  }

  async create(data: Order): Promise<Order> {
    try {
      return await Order.create({ ...data });
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async findOneById(
    id: number,
    isThrowException = false
  ): Promise<Order | null> {
    const user = await Order.findByPk(id, {
      include: [{ model: Book, as: "book" }],
    });
    if (isThrowException && !user) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, data: Order): Promise<boolean> {
    const [affected] = await Order.update(data, { where: { id } });
    return affected > 0;
  }

  async delete(id: number): Promise<number> {
    await this.findOneById(id, true);
    return await Order.destroy({ where: { id } });
  }

  // === Utils === \\
}
