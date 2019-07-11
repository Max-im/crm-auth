import { Router } from "express";
import { returnExistingUser, createNewUser } from "../../controllers/auth";

const router = Router();

router.post("/", returnExistingUser, createNewUser);

module.exports = router;
