import User from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async pagination(): Promise<User[]> {
    return await this.userRepository.pagination();
  }

  async create(data: User): Promise<User> {
    return await this.userRepository.create(data);
  }

  async read(id: number): Promise<User | null> {
    return await this.userRepository.findOneById(id);
  }

  async update(id: number, data: User): Promise<boolean> {
    await this.userRepository.update(id, data);
    return this.userRepository.findOneById(id) !== null;
  }

  async delete(id: number): Promise<number> {
    return this.userRepository.delete(id);
  }
}
