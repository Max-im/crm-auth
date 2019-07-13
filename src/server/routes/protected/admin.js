import { Router } from "express";
import { isAdminOnly } from "../../middlewares/permissions";
import createUserValidation from "../../validation/createUser";
import updateUserValidation from "../../validation/updateUser";
import { createInitGroups, createMockData } from "../../middlewares/fake";
import { returnFormatedUser } from "../../middlewares/common";
import {
  getGroups,
  getRoles,
  getRoleToUpdate,
  updateUserRole,
  getSingleUser,
  createData,
  updateData,
  deleteUserData
} from "../../middlewares/admin";

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
router.post(
  "/",
  isAdminOnly,
  createUserValidation,
  createData,
  returnFormatedUser
);

/**
 * Update dataset item
 */
router.put(
  "/",
  isAdminOnly,
  updateUserValidation,
  updateData,
  returnFormatedUser
);

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
