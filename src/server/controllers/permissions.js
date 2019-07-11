import User from "../models/User";

export const isAdmin = (req, res, next) => {
  const err = "Not authorized";
  const alowsArr = ["admin", "moderator"];

  // check if there is authorization header
  const { authorization } = req.headers;
  if (!authorization) return res.status(400).end(err);

  // retrieve gId from request
  const { gId } = JSON.parse(authorization);
  if (!gId) return res.status(400).end(err);

  // search user with the gId
  User.findOne({ gId })
    .then(user => {
      if (!user) return res.status(400).end(err);
      if (!alowsArr.includes(user.role)) return res.status(400).end(err);
      else next();
    })
    .catch(err => res.status(400).json(err));
};

export const isAdminOnly = (req, res, next) => {
  const err = "Not authorized";
  const alowsArr = ["admin"];

  // check if there is authorization header
  const { authorization } = req.headers;
  if (!authorization) return res.status(400).end(err);

  // retrieve gId from request
  const { gId } = JSON.parse(authorization);
  if (!gId) return res.status(400).end(err);

  // search user with the gId
  User.findOne({ gId })
    .then(user => {
      if (!user) return res.status(400).end(err);
      if (!alowsArr.includes(user.role)) return res.status(400).end(err);
      else next();
    })
    .catch(err => res.status(400).json(err));
};
