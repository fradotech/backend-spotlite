import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Initial!");
});

app.listen(3000, () => console.log("App is running on http://localhost:3000"));
