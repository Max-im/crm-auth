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
