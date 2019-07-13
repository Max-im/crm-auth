import Session from "../models/Session";

export const returnFormatedUser = (req, res) => {
  const { theUser } = req.body;

  if (theUser instanceof Array) {
    const formated = theUser.map(item => {
      const { _id, personal, avatar, created, role, marks, group } = item;
      return { _id, personal, avatar, created, role: role.name, marks, group };
    });
    res.json(formated);
  } else {
    const { _id, personal, avatar, created, role, marks, group } = theUser;
    res.json({ _id, personal, avatar, created, role: role.name, marks, group });
  }
};

export const openSession = (req, res, next) => {
  const { theUser } = req.body;
  Session.create({ user: theUser._id })
    .then(session => {
      req.body.sessionId = session._id;
      return next();
    })
    .catch(err => res.status(400).json({ err }));
};

export const closeSession = (req, res) => {
  const { user } = req;
  const { session } = user;
  Session.findOneAndUpdate(
    { _id: session },
    { $set: { current: false, finished: new Date() } }
  )
    .then(() => res.end())
    .catch(err => res.status(400).json({ err }));
};
