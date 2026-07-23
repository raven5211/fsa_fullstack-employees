import express from "express";
const router = express.Router();
export default router;

import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "#db/queries/employees";

router.get("/", async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

router.post("/", async (req, res) => {
  if (!req.body) return res.status(400).send("no body");

  const newEmployee = req.body;
  if (!newEmployee.name || !newEmployee.birthday || !newEmployee.salary) {
    return res.status(400).send("body must include name, birthday, and salary");
  }

  const employee = await createEmployee(newEmployee);
  res.status(201).send(employee);
});

router.param("id", async (req, res, next) => {
  const { id } = req.params;
  const employee = await getEmployee(id);

  if (!employee) return res.status(404).send("employee not found");

  req.employee = employee;
  next();
});

router.get("/:id", async (req, res) => {
  res.send(req.employee);
});

router.delete("/:id", async (req, res) => {
  const deleted = await deleteEmployee(req.employee.id);
  res.status(204).send(deleted);
});

router.put("/:id", async (req, res) => {
  if (!req.body) return res.status(400).send("no body");

  const newEmployee = req.body;
  if (!newEmployee.name || !newEmployee.birthday || !newEmployee.salary) {
    return res.status(400).send("body must include name, birthday, and salary");
  }

  const updated = await updateEmployee(newEmployee);
  res.send(updated);
});
