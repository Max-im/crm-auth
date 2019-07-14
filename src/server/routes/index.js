import { Router } from "express";
import auth from "./public/auth";
import fake from "./public/fake";
import admin from "./protected/admin";
import moderator from "./protected/moderator";
import analysts from "./protected/analysts";

const router = Router();

router.use("/", fake);
router.use("/auth", auth);
router.use("/admin", admin);
router.use("/moderator", moderator);
router.use("/analysts", analysts);
router.get("*", (req, res) => res.status(404).send());

module.exports = router;
