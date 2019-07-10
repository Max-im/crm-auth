import { Router } from "express";
import User from "../../models/User";

const router = Router();

router.post("/", async (req, res) => {
  User.create(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
