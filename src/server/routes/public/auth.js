import { Router } from "express";
import authInputValidation from "../../validation/auth";
import { openSession, closeSession } from "../../middlewares/sessions";
import { attachUser } from "../../middlewares/permissions";
import {
  returnExistingUser,
  createNewUser,
  generateToken
} from "../../middlewares/auth";

const router = Router();

router.post(
  "/",
  authInputValidation,
  returnExistingUser,
  createNewUser,
  openSession,
  generateToken
);

router.get("/", attachUser, closeSession);

module.exports = router;
