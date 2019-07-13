import { Router } from "express";
import { isModerator } from "../../middlewares/permissions";
import { getUserData, getUsersNum } from "../../middlewares/moderator";
import { returnFormatedUser } from "../../middlewares/common";

const router = Router();

/**
 * GET number of users
 */
router.get("/users-num", isModerator, getUsersNum);

/**
 * GET dataset MUST be after /groups
 */
router.get("/:id", isModerator, getUserData, returnFormatedUser);

module.exports = router;
