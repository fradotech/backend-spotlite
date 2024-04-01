import { ApiQueryRequest } from "../../infrastructure/api.contract";
import { Book } from "../entities/book.entity";
import { Order } from "../entities/order.entity";
import { OrderStatusEnum } from "../enums/order.enum";
import { BookRepository } from "../repositories/book.repository";
import { OrderRepository } from "../repositories/order.repository";

export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly bookRepository: BookRepository
  ) {}

  async list(
    query?: ApiQueryRequest
  ): Promise<{ rows: Order[]; count: number }> {
    return await this.orderRepository.list(query);
  }

  async create(data: Order): Promise<Order> {
    const book = (await this.bookRepository.findOneById(
      data.bookId,
      true
    )) as Book;

    data.totalPrice = book.pointPrice * (data.qty ?? 1);
    data.status = OrderStatusEnum.PENDING;

    return await this.orderRepository.create(data);
  }

  async read(id: number): Promise<Order | null> {
    return await this.orderRepository.findOneById(id, true);
  }

  async update(id: number, data: Order): Promise<Order | null> {
    const book = (await this.bookRepository.findOneById(
      data.bookId,
      true
    )) as Book;

    data.totalPrice = book.pointPrice * (data.qty ?? 1);
    data.status = OrderStatusEnum.PENDING;
    
    await this.orderRepository.update(id, data);
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
