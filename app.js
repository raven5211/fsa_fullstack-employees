import express from "express";
import morgan from "morgan";
const app = express();
export default app;

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

import employeesRouter from "#api/employees";

app.use("/employees", employeesRouter);

//catchall
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
