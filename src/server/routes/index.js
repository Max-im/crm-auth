import { Router } from "express";
import auth from "./public/auth";
import data from "./admin/data";

const router = Router();

router.use("/auth", auth);
router.use("/data", data);

module.exports = router;
