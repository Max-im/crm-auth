import User from "../models/User";
import Group from "../models/Group";
import Role from "../models/Role";

export const getUserData = (req, res) => {
  const { skipNum } = req.params;

  User.find()
    .populate("group")
    .populate("role")
    .skip(skipNum - 0)
    .limit(50)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
};

export const getGroups = (req, res) => {
  Group.find()
    .then(groups => res.json(groups))
    .catch(err => res.status(400).json(err));
};

export const getRoles = (req, res) => {
  Role.find()
    .then(roles => res.json(roles))
    .catch(err => res.status(400).json(err));
};

export const createData = (req, res) => {
  const newUser = {
    index: req.body.index,
    text: req.body.text,
    avatar: req.body.avatar,
    created: req.body.created,
    name: req.body.name,
    group: req.body.group,
    personal: { name: req.body.name }
  };
  User.create(newUser)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
};

export const updateData = (req, res) => {
  const { id, name, index, text } = req.body;

  User.findOneAndUpdate(
    { _id: id },
    { $set: { "personal.name": name, index, text } },
    { new: true }
  )
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
};

export const deleteUserData = (req, res) => {
  const { id } = req.params;
  User.findOneAndRemove({ _id: id })
    .then(() => res.end())
    .catch(err => res.status(400).json(err));
};
