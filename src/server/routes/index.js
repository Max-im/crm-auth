import { Router } from "express";
import auth from "./public/auth";
import admin from "./protected/admin";
import moderator from "./protected/moderator";

const router = Router();

router.use("/auth", auth);
router.use("/admin", admin);
router.use("/moderator", moderator);

module.exports = router;
