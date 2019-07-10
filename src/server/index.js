import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import mongoose from "mongoose";
import routes from "./routes";

const app = express();

// settings
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
logger("dev");

// db connect
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  // eslint-disable-next-line
  .then(() => console.log("db connect"))
  // eslint-disable-next-line
  .catch(err => console.error(err));

// routes
app.use("/", routes);

// error handle
// eslint-disable-next-line
app.use((err, req, res, next) => {
  res.json(err);
});

module.exports = app;
