import User from "../entities/user.entity";

export class UserRepository {
  async pagination(): Promise<User[]> {
    return User.findAll();
  }

  async create(data: User): Promise<User> {
    return User.create({ ...data });
  }

  async findOneById(id: number): Promise<User | null> {
    return User.findByPk(id);
  }

  async update(id: number, data: User): Promise<boolean> {
    const [affected] = await User.update(data, { where: { id } });
    return affected > 0;
  }

  async delete(id: number): Promise<number> {
    return User.destroy({ where: { id } });
  }
}
