import { Router } from "express";
import auth from "./public/auth";

const router = Router();

router.use("/auth", auth);

module.exports = router;
