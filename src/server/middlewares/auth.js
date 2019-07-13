import jwt from "jsonwebtoken";
import User from "../models/User";

/**
 * @description return User data from DB
 */
export const returnExistingUser = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ "personal.email": email })
    .populate("role")
    .populate("group")
    .then(user => {
      if (user) req.body.theUser = user;
      return next();
    })
    .catch(err => res.status(404).json(err));
};

/**
 * @description create new User (launched only if there is no the User)
 */
export const createNewUser = async (req, res, next) => {
  const { name, email, theUser } = req.body;
  if (theUser) return next();

  const newUser = await User.create({ ...req.body, personal: { name, email } });
  const user = await User.findOne({ _id: newUser._id })
    .populate("group")
    .populate("role");

  req.body.theUser = user;
  return next();
};

/**
 * @description sign new auth token and return it on frontend
 */
export const generateToken = (req, res) => {
  const { theUser } = req.body;
  const access_token = jwt.sign(
    {
      sub: theUser._id,
      user: {
        name: theUser.personal.name,
        email: theUser.personal.email,
        avatar: theUser.avatar,
        role: theUser.role.name
      }
    },
    process.env.SECRET_OR_KEY,
    { expiresIn: 3600 }
  );

  return res.json({ access_token });
};
