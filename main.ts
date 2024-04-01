import express from "express";
import { CONFIG } from "./config";
import { useDatabase } from "./database/database.connect";
import userRouter from "./src/user.module";

const app = express();

app.use(express.json());
useDatabase();

app.get("/", (_, res) => res.send("Spotlite book API!"));

app.use(CONFIG.prefix, userRouter);

app.listen(CONFIG.port, () =>
  console.info("App is running on port ", CONFIG.port)
);
