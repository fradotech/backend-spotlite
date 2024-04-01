import { CONFIG } from "../config";
import { ApiQueryRequest } from "../../infrastructure/api.contract";
import { UnauthorizedException } from "../../infrastructure/exceptions/unauthorized.exception";
import { User } from "../entities/user.entity";
import { UserPointEnum } from "../enums/user.enum";
import { UserRepository } from "../repositories/user.repository";
import jwt from "jsonwebtoken";

export class UserAuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(data: User): Promise<User | null> {
    const user = await this.userRepository.create(data);
    await this.userRepository.updatePoint(user.id, UserPointEnum.REGISTER);
    return await this.userRepository.findOneById(user.id, true);
  }

  async login(data: User): Promise<User> {
    const user = await this.userRepository.findOneByEmail(data.email);

    if (!user || data.password !== user.password) {
      throw new UnauthorizedException("Email or password wrong");
    }

    const payload = { id: user.id, name: user.name, email: user.email };
    user.dataValues._accessToken = jwt.sign(payload, CONFIG.auth.secret, { expiresIn: "30d" });

    return user;
  }
}
