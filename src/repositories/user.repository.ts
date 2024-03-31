import { Op } from "sequelize";
import { ApiQueryRequest } from "../../infrastructure/api.contract";
import User from "../entities/user.entity";
import { BadRequestException } from "../../infrastructure/exceptions/BadRequestException";
import { NotFoundException } from "../../infrastructure/exceptions/NotFoundException";

export class UserRepository {
  async list(
    query?: ApiQueryRequest
  ): Promise<{ rows: User[]; count: number }> {
    const { take, search, filterBy, filterValue } = query || {};

    if (filterBy && !Object.keys(User.getAttributes()).includes(filterBy)) {
      throw new BadRequestException(
        `Column "${filterBy}" not found. Available columns: ${Object.keys(
          User.getAttributes()
        ).join(", ")}`
      );
    }

    const options = {
      limit: take,
      where: {
        ...(search && { name: { [Op.like]: `%${search}%` } }),
        ...(filterBy && filterValue && { [filterBy]: filterValue }),
      },
    };

    return await User.findAndCountAll(options);
  }

  async create(data: User): Promise<User> {
    return User.create({ ...data });
  }

  async findOneById(
    id: number,
    isThrowException = false
  ): Promise<User | null> {
    const user = await User.findByPk(id);
    if (isThrowException && !user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, data: User): Promise<boolean> {
    const [affected] = await User.update(data, { where: { id } });
    return affected > 0;
  }

  async delete(id: number): Promise<number> {
    return User.destroy({ where: { id } });
  }
}
