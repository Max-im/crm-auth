import { Router } from "express";
import authInputValidation from "../../validation/auth";
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
  generateToken
);

module.exports = router;
