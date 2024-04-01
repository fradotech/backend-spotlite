import { DataTypes, Model } from "sequelize";
import sequelizeConfig from "../../database/sequelize.config";
import { BookTagEnum } from "../enums/book.enum";
import { BadRequestException } from "../../infrastructure/exceptions/bad-request.exception";

export class Book extends Model {
  id!: number;
  title!: string;
  writerName!: string;
  coverUrl!: string;
  pointPrice!: number;
  tags!: Array<BookTagEnum>;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    writerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coverUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      // https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg
    },
    pointPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        isArrayOfEnum(value: string) {
          if (!Array.isArray(value)) {
            throw new BadRequestException("Tags must be an array");
          }

          const validValues = Object.values(BookTagEnum);
          for (const tag of value) {
            if (!validValues.includes(tag)) {
              throw new BadRequestException(
                `Invalid tag value. Tag value must be one of: ${validValues.join(
                  ", "
                )}`
              );
            }
          }
        },
      },
    },
  },
  {
    sequelize: sequelizeConfig,
    tableName: "books",
  }
);
