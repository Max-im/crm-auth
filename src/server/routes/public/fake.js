import { Router } from "express";
import { createInitGroups, createMockData } from "../../middlewares/fake";

const router = Router();

/**
 * fill out data set of mock data
 */
router.post("/add-mock-data", createInitGroups, createMockData);

module.exports = router;
