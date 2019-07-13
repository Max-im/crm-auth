import Validator from "validator";
import isEmpty from "./isEmpty";

const updateUserValidation = (req, res, next) => {
  const errors = {};
  const { index, text, name } = req.body;

  const theIndex = isEmpty(index) ? "" : index;
  const theName = isEmpty(name) ? "" : name;
  const theText = isEmpty(text) ? "" : text;

  // NAME CHECK
  if (Validator.isEmpty(theName)) {
    errors.name = "Name field is required";
  }

  // INDEX CHECK
  if (Validator.isEmpty(theIndex)) {
    errors.index = "Index field is required";
  }

  // TEXT CHECK
  if (Validator.isEmpty(theText)) {
    errors.index = "Text field is required";
  }

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);
  return next();
};

module.exports = updateUserValidation;
