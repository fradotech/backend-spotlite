import { ApiQueryRequest } from "../../infrastructure/api.contract";
import { Order } from "../entities/order.entity";
import { OrderRepository } from "../repositories/order.repository";

export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async list(
    query?: ApiQueryRequest
  ): Promise<{ rows: Order[]; count: number }> {
    return await this.orderRepository.list(query);
  }

  async create(data: Order): Promise<Order> {
    return await this.orderRepository.create(data);
  }

  async read(id: number): Promise<Order | null> {
    return await this.orderRepository.findOneById(id, true);
  }

  async update(id: number, data: Order): Promise<Order | null> {
    await this.orderRepository.update(id, data);
    return await this.orderRepository.findOneById(id, true);
  }

  async delete(id: number): Promise<number> {
    return await this.orderRepository.delete(id);
  }
}
