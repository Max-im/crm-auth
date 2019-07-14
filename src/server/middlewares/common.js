import { storeSessionRequestData } from "./sessions";

export const returnFormatedUser = (req, res) => {
  const { theUser } = req.body;
  storeSessionRequestData(req);

  if (theUser instanceof Array) {
    const formated = theUser.map(item => {
      const {
        _id,
        personal,
        avatar,
        created,
        role,
        marks,
        group,
        index,
        text
      } = item;
      return {
        _id,
        personal,
        avatar,
        created,
        role: role.name,
        marks,
        group,
        text,
        index
      };
    });
    res.json(formated);
  } else {
    const {
      _id,
      personal,
      avatar,
      created,
      role,
      marks,
      group,
      text,
      index
    } = theUser;
    res.json({
      _id,
      personal,
      avatar,
      created,
      role: role.name,
      marks,
      group,
      text,
      index
    });
  }
};
