import { Router } from "express";
import { isAnalyst } from "../../middlewares/permissions";
import {
  getSessionNumber,
  getSessions,
  getStat
} from "../../middlewares/analyst";

const router = Router();

/**
 * GET stat
 */
router.get("/stat", isAnalyst, getStat);

/**
 * GET sessions amount
 */
router.get("/number", isAnalyst, getSessionNumber);

/**
 * GET sessions
 */
router.get("/:page", isAnalyst, getSessions);

module.exports = router;
