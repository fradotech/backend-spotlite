import { DataTypes, Model } from "sequelize";
import sequelizeConfig from "../../database/sequelize.config";

export class User extends Model {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  point!: number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize: sequelizeConfig,
    tableName: "users",
  }
);
