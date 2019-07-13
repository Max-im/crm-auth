import Group from "./Group";
import Role from "./Role";
// import Stat from "./Statistic";

export async function userPreSave(next) {
  if (!this.isNew) next();
  const self = this;

  //   init random group
  await Group.aggregate([{ $sample: { size: 1 } }], function saveGroup(
    gErr,
    groups
  ) {
    if (gErr) next(gErr);

    self.group = groups[0]._id;

    // init role user
    Role.findOne({ name: "user" }, function saveRole(rErr, role) {
      if (rErr) next(rErr);
      self.role = role._id;

      // add data to Stat
      // Stat.findOneAndUpdate()
      next();
    });
  });
}
