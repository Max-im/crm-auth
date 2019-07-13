import Validator from "validator";
import isEmpty from "./isEmpty";

const authInputValidation = (req, res, next) => {
  const errors = {};
  const { name, email, avatar } = req.body;

  const theAvatar = isEmpty(avatar) ? "" : avatar;
  const theName = isEmpty(name) ? "" : name;
  const theEmail = isEmpty(email) ? "" : email;

  // EMAIL CHECK
  if (!Validator.isEmail(theEmail)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(theEmail)) {
    errors.email = "Email field is required";
  }

  // NAME CHECK
  if (Validator.isEmpty(theName)) {
    errors.name = "Name field is required";
  }

  // AVATAR CHECK
  if (!Validator.isURL(theAvatar)) {
    errors.avatar = "Avatar must be URL";
  }
  if (Validator.isEmpty(theAvatar)) {
    errors.avatar = "Avatar field is required";
  }

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);
  return next();
};

module.exports = authInputValidation;
