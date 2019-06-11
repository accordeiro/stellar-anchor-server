import dotenv from "dotenv";
import express from "express";

dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();

app.get("/", (req, res) => {
  res.send("Hi! This is the anchor server!");
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`🚀Anchor server started at http://localhost:${port}`);
});
