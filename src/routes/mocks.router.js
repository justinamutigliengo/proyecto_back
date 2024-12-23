import { Router } from "express";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import mocksController from "../controllers/mocks.controller.js";
import { generateMockUsers } from "../utils/mockGenerator.js";

const router = Router();

router.get("/", mocksController.getMocks);
router.post("/", mocksController.createMock);
router.get("/mockingusers", mocksController.generateMockUsers);
router.post("/generateData", mocksController.generateData);

export default router;
