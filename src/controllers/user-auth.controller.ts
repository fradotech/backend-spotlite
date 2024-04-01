import { ApiResponse } from "../../infrastructure/api.contract";
import User from "../entities/user.entity";
import { UserAuthService } from "../services/user-auth.service";
import { Request } from "express";

export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  register = ApiResponse.tryCatch(
    async (req: Request): Promise<User | null> => {
      return await this.userAuthService.register(req.body);
    }
  );

  login = ApiResponse.tryCatch(async (req: Request): Promise<User | null> => {
    return await this.userAuthService.login(req.body);
  });
}
