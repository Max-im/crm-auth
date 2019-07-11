import { Router } from "express";
import { isAdmin, isAdminOnly } from "../../controllers/permissions";
import { createInitGroups, createMockData } from "../../controllers/fake";
import {
  getUserData,
  getGroups,
  getRoles,
  createData,
  updateData,
  deleteUserData
} from "../../controllers/data";

const router = Router();

/**
 * GET groups
 */
router.get("/groups", isAdminOnly, getGroups);

/**
 * GET roles
 */
router.get("/roles", isAdminOnly, getRoles);

/**
 * GET dataset MUST be after /groups
 */
router.get("/:skipNum", isAdmin, getUserData);

/**
 * Create new dataset item
 */
router.post("/", isAdminOnly, createData);

/**
 * Update dataset item
 */
router.put("/", isAdminOnly, updateData);

/**
 * Delete dataset item
 */
router.delete("/:id", isAdminOnly, deleteUserData);

/**
 * fill out data set of mock data
 */
router.post("/add-mock-data", isAdminOnly, createInitGroups, createMockData);

module.exports = router;
