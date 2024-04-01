import express from "express";
import cors from "cors";
import { CONFIG } from "./config";
import { useDatabase } from "../database/database.connect";
import userRouter from "./user.module";
import bookRouter from "./book.module";
import orderRouter from "./order.module";
import authMiddleware from "../infrastructure/middlewares/auth.middleware";

const app = express();

app.use(cors());
app.use(express.json());

useDatabase();

app.get("/", (_, res) => res.send("Spotlite book API!"));

app.use(authMiddleware);

app.use(CONFIG.prefix, userRouter);
app.use(CONFIG.prefix, bookRouter);
app.use(CONFIG.prefix, orderRouter);

app.listen(CONFIG.port, () => console.info("App running port ", CONFIG.port));
