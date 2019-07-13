import jwt from "jsonwebtoken";
import User from "../models/User";

export const isModerator = (req, res, next) => {
  checkPermissions(req, res, next, ["admin", "moderator"]);
};

export const isAdminOnly = (req, res, next) => {
  checkPermissions(req, res, next, ["admin"]);
};

export const isAnalyst = (req, res, next) => {
  checkPermissions(req, res, next, ["admin", "analyst"]);
};

const checkPermissions = (req, res, next, alowsArr) => {
  const err = { msg: "Not authorized" };

  // check if there is authorization header
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json(err);

  // // retrieve email from request
  const access_token = JSON.parse(authorization);
  jwt.verify(access_token, process.env.SECRET_OR_KEY, (err, decoded) => {
    if (err) return res.status(401).json(err);

    const { sub, exp, iat } = decoded;
    if (!sub || !exp || !iat) return res.status(401).json(err);
    if (exp * 1000 < Date.now()) return res.status(401).json(err);

    // get the user from db
    User.findOne({ _id: sub })
      .populate("role")
      .populate("group")
      .then(user => {
        if (!user) return res.status(401).json(err);
        const role = user.role.name;
        if (role !== decoded.user.role) return res.status(401).json(err);
        if (!alowsArr.includes(role)) return res.status(401).json(err);
        req.user = user;
        req.startTimestamp = new Date().getTime();
        req.session = decoded.user.session;
        return next();
      })
      .catch(err => res.status(401).json(err));
  });
};

export const attachUser = (req, res, next) => {
  const err = { msg: "Not authorized" };

  // check if there is authorization header
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json(err);

  // // retrieve email from request
  const access_token = JSON.parse(authorization);
  jwt.verify(access_token, process.env.SECRET_OR_KEY, (err, decoded) => {
    if (err) return res.status(401).json(err);

    const { sub } = decoded;
    if (!sub) return res.status(401).json(err);

    // get the user from db
    User.findOne({ _id: sub })
      .then(user => {
        if (!user) return res.status(401).json(err);
        req.user = user;
        req.session = decoded.user.session;
        return next();
      })
      .catch(err => res.status(401).json(err));
  });
};
