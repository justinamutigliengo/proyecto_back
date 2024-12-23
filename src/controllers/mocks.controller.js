import { mocksService, usersService, petsService } from "../services/index.js";
import { generateMockUsers } from "../utils/mockGenerator.js";
import { faker } from "@faker-js/faker";

const mocksController = {
  getMocks: async (req, res) => {
    try {
      const mocks = await mocksService.getAll();
      res.status(200).json(mocks);
    } catch (error) {
      res.status(500).json({ error: "Error fetching mocks" });
    }
  },

  createMock: async (req, res) => {
    try {
      const { name, description } = req.body;

      if (!name || !description) {
        return res
          .status(400)
          .json({ error: "Name and description are required" });
      }

      const newMock = await mocksService.create({ name, description });

      res.status(201).json(newMock);
    } catch (error) {
      res.status(500).json({ error: "Error creating mock" });
    }
  },

  generateMockUsers: async (req, res) => {
    try {
      const numUsers = 50;
      const users = await generateMockUsers(numUsers);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Error generating mock users" });
    }
  },

  generateData: async (req, res) => {
    try {
      const { users, pets } = req.body;

      if (!users || !pets || users <= 0 || pets <= 0) {
        return res
          .status(400)
          .json({ error: "Invalid number of users or pets" });
      }

      const generatedUsers = [];
      for (let i = 0; i < users; i++) {
        const user = {
          username: faker.internet.userName(),
          password: "coder123",
          role: faker.helpers.arrayElement(["user", "admin"]),
          pets: [],
        };

        const newUser = await usersService.create(user);
        generatedUsers.push(newUser);
      }

      const generatedPets = [];
      for (let i = 0; i < pets; i++) {
        const pet = {
          name: faker.animal.dog(),
          age: faker.datatype.number({ min: 1, max: 15 }),
          breed: faker.animal.dog(),
        };

        const newPet = await petsService.create(pet);
        generatedPets.push(newPet);
      }

      const insertedUsers = await usersService.getAll();
      const insertedPets = await petsService.getAll();

      res.status(201).json({
        message: "Data generated successfully",
        users: insertedUsers.length,
        pets: insertedPets.length,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error generating data" });
    }
  },
};

export default mocksController;
