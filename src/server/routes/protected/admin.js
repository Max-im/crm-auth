import { Router } from "express";
import { isAdmin, isAdminOnly } from "../../controllers/permissions";
import { createInitGroups, createMockData } from "../../controllers/fake";
import {
  getGroups,
  getRoles,
  getRoleToUpdate,
  updateUserRole,
  getSingleUser,
  createData,
  updateData,
  deleteUserData
} from "../../controllers/admin";

import { returnFormatedUser } from "../../controllers/common";

const router = Router();

/**
 * GET groups
 */
router.get("/groups", isAdminOnly, getGroups);

/**
 * GET single user
 */
router.get("/user/:id", isAdminOnly, getSingleUser, returnFormatedUser);

/**
 * GET roles
 */
router.get("/roles", isAdminOnly, getRoles);

/**
 * Create new dataset item
 */
router.post("/", isAdminOnly, createData, returnFormatedUser);

/**
 * Update dataset item
 */
router.put("/", isAdminOnly, updateData, returnFormatedUser);

/**
 * Update user role
 */
router.put(
  "/role",
  isAdminOnly,
  getRoleToUpdate,
  updateUserRole,
  returnFormatedUser
);

/**
 * fill out data set of mock data
 */
router.post("/add-mock-data", isAdminOnly, createInitGroups, createMockData);

/**
 * Delete dataset item
 */
router.delete("/:id", isAdminOnly, deleteUserData);

module.exports = router;
