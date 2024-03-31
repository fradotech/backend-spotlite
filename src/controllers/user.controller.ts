import { ApiResponse } from "../../infrastructure/api.contract";
import User from "../entities/user.entity";
import { UserService } from "../services/user.service";
import { Request, Response } from "express";

export class UserController {
  constructor(private readonly userService: UserService) {}

  pagination = ApiResponse.tryCatch(async (req: Request) => {
    return await this.userService.pagination();
  });

  create = ApiResponse.tryCatch(async (req: Request) => {
    const data: User = req.body;
    return await this.userService.create(data);
  });

  read = ApiResponse.tryCatch(async (req: Request) => {
    const id: number = parseInt(req.params.id);
    return await this.userService.read(id);
  });

  update = ApiResponse.tryCatch(async (req: Request) => {
    const id: number = parseInt(req.params.id);
    const data: User = req.body;
    return await this.userService.update(id, data);
  });

  delete = ApiResponse.tryCatch(async (req: Request) => {
    const id: number = parseInt(req.params.id);
    return await this.userService.delete(id);
  });
}