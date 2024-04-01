import { Op } from "sequelize";
import { ApiQueryRequest } from "../../infrastructure/api.contract";
import User from "../entities/user.entity";
import { BadRequestException } from "../../infrastructure/exceptions/bad-request.exception";
import { NotFoundException } from "../../infrastructure/exceptions/not-found.exception";

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
        ...(search && {
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } },
          ],
        }),
        ...(filterBy && filterValue && { [filterBy]: filterValue }),
      },
    };

    return await User.findAndCountAll(options);
  }

  async create(data: User): Promise<User> {
    try {
      await this.findOneByEmail(data.email, true);
      return await User.create({ ...data });
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
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
    await this.findOneById(id, true);
    return await User.destroy({ where: { id } });
  }

  // === Utils === \\

  async findOneByEmail(
    email: string,
    isThrowException = false
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (isThrowException && user) {
      throw new BadRequestException(`Email ${email} already exists`);
    }
    return user;
  }

  async updatePoint(id: number, point: number): Promise<boolean> {
    const [affected] = await User.update({ point }, { where: { id } });
    return affected > 0;
  }
}
