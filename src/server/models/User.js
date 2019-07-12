import { Schema, model } from "mongoose";
import Role from "./Role";
import Group from "./Group";

const UserSchema = new Schema({
  index: { type: Number },
  text: { type: String },

  role: { type: Schema.Types.ObjectId, ref: "role" },
  gId: { type: String },
  avatar: { type: String },
  personal: {
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  group: { type: Schema.Types.ObjectId, ref: "groups" },
  marks: [
    {
      comment: { type: String, required: true },
      date: { type: Date, default: Date.now }
    }
  ],
  created: { type: Date, default: Date.now }
});

UserSchema.pre("save", function(next) {
  if (!this.isNew) next();
  const self = this;

  // init random group
  Group.aggregate([{ $sample: { size: 1 } }], function(err, results) {
    if (err) next(err);

    self.group = results[0]._id;

    // init role user
    Role.findOne({ name: "user" }, function(err, results) {
      if (err) next(err);
      self.role = results._id;
      next();
    });
  });
});

module.exports = model("user", UserSchema);
