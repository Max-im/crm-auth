import { Router } from "express";
import { isModerator } from "../../controllers/permissions";
import { getUserData, getUsersNum } from "../../controllers/moderator";
import { returnFormatedUser } from "../../controllers/common";

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
