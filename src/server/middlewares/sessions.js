import Session from "../models/Session";

export const openSession = (req, res, next) => {
  const { theUser } = req.body;
  Session.create({ user: theUser._id })
    .then(session => {
      req.body.sessionId = session._id;
      return next();
    })
    .catch(err => res.status(400).json({ err }));
};

export const storeSessionRequestData = req => {
  const { method, url, session, startTimestamp } = req;
  const long = new Date().getTime() - startTimestamp;
  const request = { method, url, long };
  Session.findOne({ _id: session }).then(item => {
    item.requests.push(request);
    item.save();
  });
};

export const closeSession = (req, res) => {
  const { session } = req;
  Session.findOneAndUpdate(
    { _id: session },
    { $set: { current: false, finished: new Date() } }
  )
    .then(() => res.end())
    .catch(err => res.status(400).json({ err }));
};
