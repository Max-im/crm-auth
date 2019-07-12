import User from "../models/User";
import { returnFormatedUser } from "./common";

/**
 * @description return User data from DB
 */
export const returnExistingUser = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ "personal.email": email })
    .populate("role")
    .populate("group")
    .then(user => {
      req.body.theUser = user;
      return returnFormatedUser(req, res);
    })
    .catch(err => res.status(404).json(err));
};

/**
 * @description create new User (launched only if there is no the User)
 */
export const createNewUser = async (req, res) => {
  const { name, email } = req.body;
  const newUser = await User.create({ ...req.body, personal: { name, email } });
  const user = await User.findOne({ _id: newUser._id })
    .populate("group")
    .populate("role");

  req.body.theUser = user;
  return returnFormatedUser(req, res);
};
