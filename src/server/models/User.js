import { Schema, model } from "mongoose";
import Role from "./Role";

const UserSchema = new Schema({
  index: { type: Number },
  text: { type: String },
  role: { type: Schema.Types.ObjectId, ref: "role" },
  gId: { type: String },
  avatar: { type: String },
  personal: {
    name: { type: String, required: true }
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
  if (!this.isNew) return next();
  const self = this;

  Role.findOne({ name: "user" }, function(err, results) {
    if (err) next(err);
    self.role = results._id;
    next();
  });
});

module.exports = model("user", UserSchema);
