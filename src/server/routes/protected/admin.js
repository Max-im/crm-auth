import { Router } from "express";
import { isAdminOnly } from "../../middlewares/permissions";
import createUserValidation from "../../validation/createUser";
import updateUserValidation from "../../validation/updateUser";
import { createInitGroups, createMockData } from "../../middlewares/fake";
import { returnFormatedUser } from "../../middlewares/common";
import { updateStat } from "../../middlewares/analyst";
import { deleteUserSessions } from "../../middlewares/sessions";
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
  getSingleUser,
  returnFormatedUser
);

/**
 * Update dataset item
 */
router.put(
  "/",
  isAdminOnly,
  updateUserValidation,
  updateStat,
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
 * Delete dataset item
 */
router.delete("/:id", isAdminOnly, deleteUserSessions, deleteUserData);

module.exports = router;
