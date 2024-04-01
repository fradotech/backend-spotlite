import { ApiQueryRequest } from "../../infrastructure/api.contract";
import { BadRequestException } from "../../infrastructure/exceptions/bad-request.exception";
import { Book } from "../entities/book.entity";
import { Order } from "../entities/order.entity";
import { User } from "../entities/user.entity";
import { OrderStatusEnum } from "../enums/order.enum";
import { BookRepository } from "../repositories/book.repository";
import { OrderRepository } from "../repositories/order.repository";
import { UserRepository } from "../repositories/user.repository";

export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly bookRepository: BookRepository,
    private readonly userRepository: UserRepository
  ) {}

  async list(
    query?: ApiQueryRequest
  ): Promise<{ rows: Order[]; count: number }> {
    return await this.orderRepository.list(query);
  }

  async create(userLogged: User, data: Order): Promise<Order> {
    const [user, book] = await Promise.all([
      this.userRepository.findOneById(userLogged.id, true),
      this.bookRepository.findOneById(data.bookId, true),
    ]);

    data.totalPrice = book.pointPrice * (data.qty ?? 1);
    data.status = OrderStatusEnum.PENDING;

    if (user.point < data.totalPrice) {
      throw new BadRequestException(
        `Insufficient point. The total amount is ${data.totalPrice} and your point is ${user.point}`
      );
    }

    // TODO: db transaction
    const dataCreated = await this.orderRepository.create(data);
    await this.userRepository.updatePoint(
      user.id,
      user.point - data.totalPrice
    );

    return await this.orderRepository.findOneById(dataCreated.id, true);
  }

  async read(id: number): Promise<Order | null> {
    return await this.orderRepository.findOneById(id, true);
  }

  async delete(id: number): Promise<number> {
    return await this.orderRepository.delete(id);
  }

  async updateStatus(id: number, data: Order): Promise<Order | null> {
    await this.orderRepository.updateStatus(id, data.status as OrderStatusEnum);
    return await this.orderRepository.findOneById(id, true);
  }
}
