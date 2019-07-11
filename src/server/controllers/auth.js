import User from "../models/User";

/**
 * @description return User data from DB
 */
export const returnExistingUser = (req, res, next) => {
  const { gId } = req.body;
  User.findOne({ gId })
    .then(user => {
      if (user) return res.json(user);
      return next();
    })
    .catch(err => res.status(404).json(err));
};

/**
 * @description create new User (launched only if there is no the User)
 */
export const createNewUser = (req, res) => {
  const { name } = req.body;
  User.create({ ...req.body, personal: { name } })
    .then(user => res.json(user))
    .catch(err => res.status(404).json(err));
};
