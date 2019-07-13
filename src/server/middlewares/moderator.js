import User from "../models/User";

export const getUserData = (req, res, next) => {
  const { id } = req.params;
  const { sort } = req.query;
  console.log(sort);
  let sortBy = "id";
  if (sort === "date") sortBy = { datefield: 1 };
  if (sort === "name") sortBy = "personal.name";
  if (sort === "index") sortBy = "index";

  console.log(sortBy);
  User.find()
    .populate("group")
    .populate("role")
    .sort(sortBy)
    .skip(id * 100 - 100)
    .limit(100)
    .then(data => {
      req.body.theUser = data;
      next();
    })
    .catch(err => res.status(400).json(err));
};

export const getUsersNum = (req, res) => {
  User.count({})
    .then(num => res.json({ num }))
    .catch(err => res.status(400).json(err));
};
