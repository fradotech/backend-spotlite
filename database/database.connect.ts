import { Book } from "../src/entities/book.entity";
import { User } from "../src/entities/user.entity";
import sequelizeConfig from "./sequelize.config";

export const Entities = {
  User: User,
  Book: Book,
};

export const useDatabase = async () => {
  await sequelizeConfig
    .authenticate()
    .then(() =>
      console.log("Database connection has been established successfully.")
    )
    .catch((error) =>
      console.error("Unable to connect to the database:", error)
    );

  await sequelizeConfig
    .sync({ alter: true })
    .then(() => console.log("Database sync completed"));
};
