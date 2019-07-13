import Validator from "validator";
import isEmpty from "./isEmpty";

const createUserValidation = (req, res, next) => {
  const errors = {};
  const { index, text, group, created, name, email, avatar } = req.body;

  const theAvatar = isEmpty(avatar) ? "" : avatar;
  const theName = isEmpty(name) ? "" : name;
  const theEmail = isEmpty(email) ? "" : email;
  const theText = isEmpty(text) ? "" : text;
  const theGroup = isEmpty(group) ? "" : group;
  const theCreated = isEmpty(created) ? "" : created;
  const theIndex = isEmpty(index) ? "" : index;

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

  // TEXT CHECK
  if (Validator.isEmpty(theText)) {
    errors.text = "Text field is required";
  }

  // INDEX CHECK
  if (Validator.isEmpty(theIndex)) {
    errors.index = "Index field is required";
  }

  // CREATED CHECK
  if (Validator.isEmpty(theCreated)) {
    errors.created = "Created field is required";
  }

  // GROUP CHECK
  if (Validator.isEmpty(theGroup)) {
    errors.group = "Group field is required";
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

module.exports = createUserValidation;
