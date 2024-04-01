import { Book } from "../src/entities/book.entity";
import { Order } from "../src/entities/order.entity";
import { User } from "../src/entities/user.entity";
import sequelizeConfig from "./sequelize.config";

export const Entities = {
  User: User,
  Book: Book,
  Order: Order
};

export const useDatabase = async () => {
  await sequelizeConfig
    .authenticate()
    .then(() =>
      console.info("Database connection has been established successfully.")
    )
    .catch((error) =>
      console.error("Unable to connect to the database:", error)
    );

  await sequelizeConfig
    .sync({ alter: true })
    .then(() => console.info("Database sync completed"));
};
