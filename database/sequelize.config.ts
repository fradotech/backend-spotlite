import { Sequelize } from "sequelize";
import { CONFIG } from "../config";

const sequelizeConfig = new Sequelize(
  CONFIG.database.name,
  CONFIG.database.username,
  CONFIG.database.password,
  {
    host: CONFIG.database.host,
    dialect: "postgres",
    define: {
      timestamps: true,
      underscored: true,
    },
  }
);

export default sequelizeConfig;
