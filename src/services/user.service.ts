import { ApiQueryRequest } from "../../infrastructure/api.contract";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async list(
    query?: ApiQueryRequest
  ): Promise<{ rows: User[]; count: number }> {
    return await this.userRepository.list(query);
  }

  async create(data: User): Promise<User> {
    return await this.userRepository.create(data);
  }

  async read(id: number): Promise<User | null> {
    return await this.userRepository.findOneById(id, true);
  }

  async update(id: number, data: User): Promise<User | null> {
    await this.userRepository.update(id, data);
    return await this.userRepository.findOneById(id, true);
  }

  async delete(id: number): Promise<number> {
    return await this.userRepository.delete(id);
  }
}
