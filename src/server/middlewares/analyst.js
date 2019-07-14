import Session from "../models/Session";
import User from "../models/User";

export const getSessionNumber = (req, res) => {
  Session.estimatedDocumentCount({})
    .then(num => res.json({ num }))
    .catch(err => res.status(400).json(err));
};

export const getSessions = (req, res) => {
  const { page } = req.params;
  Session.find({})
    .populate("user")
    .skip(page * 100 - 100)
    .sort({ _id: -1 })
    .limit(100)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
};

export const updateStat = (req, res, next) => {
  const { id, index } = req.body;
  User.findOne({ _id: id }).then(currentUser => {
    if (currentUser.index === index) return next();

    return Stat.findOneAndUpdate(
      {},
      { $inc: { indexSum: index - currentUser.index } }
    )
      .then(() => next())
      .catch(err => res.status(400).json(err));
  });
};

export const getStat = async (req, res) => {
  const ageAvg = await User.aggregate([
    { $group: { _id: null, ageAvg: { $avg: "$age" } } }
  ]);

  const indexSum = await User.aggregate([
    { $group: { _id: null, indexSum: { $sum: "$index" } } }
  ]);

  res.json({ ageAvg: ageAvg[0].ageAvg, indexSum: indexSum[0].indexSum });
};
