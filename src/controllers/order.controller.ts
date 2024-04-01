import { ApiResponse } from "../../infrastructure/api.contract";
import { Order } from "../entities/order.entity";
import { OrderService } from "../services/order.service";
import { Request } from "express";

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  list = ApiResponse.tryCatch(async (req: Request) => {
    return await this.orderService.list(req.query);
  });

  create = ApiResponse.tryCatch(async (req: Request): Promise<Order> => {
    return await this.orderService.create(req.body);
  });

  read = ApiResponse.tryCatch(async (req: Request): Promise<Order | null> => {
    return await this.orderService.read(+req.params.id);
  });

  update = ApiResponse.tryCatch(async (req: Request): Promise<Order | null> => {
    return await this.orderService.update(+req.params.id, req.body);
  });

  delete = ApiResponse.tryCatch(async (req: Request): Promise<number> => {
    return await this.orderService.delete(+req.params.id);
  });
}
