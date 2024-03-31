import express from "express";
import { CONFIG } from "./config";
import sequelizeConfig from "./database/sequelize.config";
import { databaseConnect } from "./database/database.connect";

const app = express();

app.use(express.json());
databaseConnect()

app.get("/", (req, res) => {
  res.send("Initial!");
});

app.listen(CONFIG.port, () => console.log("App is running on port " + CONFIG.port));
