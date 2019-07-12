import User from "../models/User";
import Role from "../models/Role";

export const isModerator = (req, res, next) => {
  const err = "Not authorized";
  const alowsArr = ["admin", "moderator"];

  // check if there is authorization header
  const { authorization } = req.headers;
  if (!authorization) return res.status(400).end(err);

  // retrieve email from request
  const {
    personal: { email }
  } = JSON.parse(authorization);

  if (!email) return res.status(400).end(err);

  // search user with the email
  User.findOne({ "personal.email": email })
    .then(user => {
      if (!user) return res.status(400).end(err);

      const roleId = user.role;
      Role.findOne({ _id: roleId }).then(role => {
        if (!role) return res.status(400).end(err);
        if (!alowsArr.includes(role.name)) return res.status(400).end(err);
        return next();
      });
    })
    .catch(err => res.status(400).json(err));
};

export const isAdminOnly = (req, res, next) => {
  const err = "Not authorized";
  const alowsArr = ["admin"];

  // check if there is authorization header
  const { authorization } = req.headers;
  if (!authorization) return res.status(400).end(err);

  // retrieve email from request
  const {
    personal: { email }
  } = JSON.parse(authorization);

  if (!email) return res.status(400).end(err);

  // search user with the email
  User.findOne({ "personal.email": email })
    .then(user => {
      if (!user) return res.status(400).end(err);

      const roleId = user.role;
      Role.findOne({ _id: roleId }).then(role => {
        if (!role) return res.status(400).end(err);
        if (!alowsArr.includes(role.name)) return res.status(400).end(err);
        return next();
      });
    })
    .catch(err => res.status(400).json(err));
};

export const isAnalyst = (req, res, next) => {
  const err = "Not authorized";
  const alowsArr = ["analyst", "admin"];

  // check if there is authorization header
  const { authorization } = req.headers;
  if (!authorization) return res.status(400).end(err);

  // retrieve email from request
  const {
    personal: { email }
  } = JSON.parse(authorization);

  if (!email) return res.status(400).end(err);

  // search user with the email
  User.findOne({ "personal.email": email })
    .then(user => {
      if (!user) return res.status(400).end(err);

      const roleId = user.role;
      Role.findOne({ _id: roleId }).then(role => {
        if (!role) return res.status(400).end(err);
        if (!alowsArr.includes(role.name)) return res.status(400).end(err);
        return next();
      });
    })
    .catch(err => res.status(400).json(err));
};
