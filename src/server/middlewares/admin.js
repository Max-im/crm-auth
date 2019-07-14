import User from "../models/User";
import Group from "../models/Group";
import Role from "../models/Role";
import { storeSessionRequestData } from "./sessions";

export const getSingleUser = (req, res, next) => {
  const { id } = req.params;
  User.findOne({ _id: id })
    .populate("group")
    .populate("role")
    .then(user => {
      req.body.theUser = user;
      next();
    })
    .catch(err => res.status(400).json(err));
};

export const getGroups = (req, res) => {
  Group.find()
    .then(groups => res.json(groups))
    .catch(err => res.status(400).json(err));
};

export const getRoles = (req, res) => {
  Role.find()
    .then(roles => res.json(roles.map(item => item.name)))
    .catch(err => res.status(400).json(err));
};

export const createData = (req, res, next) => {
  const newUser = {
    index: req.body.index,
    text: req.body.text,
    avatar: req.body.avatar,
    created: req.body.created,
    name: req.body.name,
    group: req.body.group,
    personal: { name: req.body.name, email: req.body.email }
  };
  User.create(newUser)
    .then(user => {
      req.params.id = user._id;
      next();
    })
    .catch(err => res.status(400).json(err));
};

export const updateData = (req, res, next) => {
  const { id, name, index, text } = req.body;

  User.findOneAndUpdate(
    { _id: id },
    { $set: { "personal.name": name, index, text } },
    { new: true }
  )
    .populate("role")
    .populate("group")
    .then(user => {
      req.body.theUser = user;
      next();
    })
    .catch(err => res.status(400).json(err));
};

export const getRoleToUpdate = (req, res, next) => {
  const { roleName } = req.body;
  Role.findOne({ name: roleName })
    .then(role => {
      req.body.theRoleId = role._id;
      return next();
    })
    .catch(err => res.status(404).json(err));
};

export const updateUserRole = (req, res, next) => {
  const { theRoleId, userId } = req.body;
  User.findOneAndUpdate(
    { _id: userId },
    { $set: { role: theRoleId } },
    { new: true }
  )
    .populate("role")
    .populate("group")
    .then(user => {
      req.body.theUser = user;
      next();
    })
    .catch(err => res.status(404).json(err));
};

export const deleteUserData = (req, res) => {
  const { id } = req.params;
  User.findOneAndRemove({ _id: id })
    .then(() => {
      storeSessionRequestData(req);

      res.end();
    })
    .catch(err => res.status(400).json(err));
};
