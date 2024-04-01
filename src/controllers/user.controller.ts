import { ApiResponse } from "../../infrastructure/api.contract";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";
import { Request } from "express";

export class UserController {
  constructor(private readonly userService: UserService) {}

  list = ApiResponse.tryCatch(async (req: Request) => {
    return await this.userService.list(req.query);
  });

  create = ApiResponse.tryCatch(async (req: Request): Promise<User> => {
    return await this.userService.create(req.body);
  });

  read = ApiResponse.tryCatch(async (req: Request): Promise<User | null> => {
    return await this.userService.read(+req.params.id);
  });

  update = ApiResponse.tryCatch(async (req: Request): Promise<User | null> => {
    return await this.userService.update(+req.params.id, req.body);
  });

  delete = ApiResponse.tryCatch(async (req: Request): Promise<number> => {
    return await this.userService.delete(+req.params.id);
  });
}
