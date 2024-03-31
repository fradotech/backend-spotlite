import express from "express";
import { CONFIG } from "./config";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Initial!");
});

app.listen(CONFIG.port, () => console.log("App is running on port " + CONFIG.port));
