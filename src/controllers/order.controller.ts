import { ApiResponse } from "../../infrastructure/api.contract";
import { Request } from "../../infrastructure/middlewares/auth.middleware";
import { Order } from "../entities/order.entity";
import { OrderService } from "../services/order.service";

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  list = ApiResponse.tryCatch(async (req: Request) => {
    return await this.orderService.list(req.query);
  });

  create = ApiResponse.tryCatch(async (req: Request): Promise<Order> => {
    return await this.orderService.create(req.user, req.body);
  });

  read = ApiResponse.tryCatch(async (req: Request): Promise<Order | null> => {
    return await this.orderService.read(+req.params.id);
  });

  delete = ApiResponse.tryCatch(async (req: Request): Promise<number> => {
    return await this.orderService.delete(+req.params.id);
  });

  updateStatus = ApiResponse.tryCatch(
    async (req: Request): Promise<Order | null> => {
      return await this.orderService.updateStatus(+req.params.id, req.body);
    }
  );
}
