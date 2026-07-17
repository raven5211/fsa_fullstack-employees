import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [];
  for (let i = 0; i < 10; i++) {
    const newEmployee = {
      //for some reason faker.person.fullName() includes prefixes with no option to always omit them,
      //so firstName + lastName will have to do
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      birthday: faker.date.past({ years: { min: 18, max: 65 } }),
      salary: faker.finance.amount({ min: 20, max: 250, dec: 0 }) * 1000,
    };

    await createEmployee(newEmployee);
  }
}
