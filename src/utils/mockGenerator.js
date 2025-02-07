import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

export const generateMockUsers = async (numUsers) => {
  const users = [];

  for (let i = 0; i < numUsers; i++) {
    const password = bcrypt.hashSync("coder123", 10);
    const role = Math.random() > 0.5 ? "user" : "admin";
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: password,
      role: role,
      pets: [],
    };

    users.push(user);
  }
  return users;
};
