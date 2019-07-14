import Role from "./Role";
import Group from "./Group";

export function userPreSave(next) {
  if (!this.isNew) next();
  const self = this;

  // init user rolw
  Role.findOne({ name: "user" }, function saveRole(rErr, role) {
    if (rErr) next(rErr);
    self.role = role._id;

    // init random group
    if (!self.group) {
      Group.aggregate([{ $sample: { size: 1 } }], function createRandomGroup(
        gErr,
        group
      ) {
        if (gErr) next(gErr);
        self.group = group[0]._id;
        next();
      });
    } else next();
  });
}
