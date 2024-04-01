import { DataTypes, Model } from "sequelize";
import sequelizeConfig from "../../database/sequelize.config";
import { OrderStatusEnum } from "../enums/order.enum";
import { Book } from "./book.entity";
import { User } from "./user.entity";

// TODO: in real use case, we need orderItems table for multiple books order
export class Order extends Model {
  id!: number;
  bookId!: number;
  book!: Book;
  userId!: number;
  user!: User;
  qty!: number;
  totalPrice!: number;
  status!: OrderStatusEnum;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: Object.values(OrderStatusEnum),
      validate: {
        isIn: {
          args: [Object.values(OrderStatusEnum)],
          msg: `Status value should be one of the following: ${Object.values(
            OrderStatusEnum
          ).join(", ")}`,
        },
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConfig,
    tableName: "orders",
  }
);

Order.addHook("afterFind", (orders) => {
  if (Array.isArray(orders)) {
    orders.forEach((order) => {
      order.totalPrice = +order?.totalPrice;
    });
  } else {
    if (!orders) return;
    (orders as Order).totalPrice = +(orders as Order)?.totalPrice;
  }
});

Order.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(Order, {
  foreignKey: "userId",
  as: "orders",
});

Order.belongsTo(Book, {
  foreignKey: "bookId",
  as: "book",
});

Book.hasMany(Order, {
  foreignKey: "bookId",
  as: "orders",
});
