import { Schema, model } from "mongoose";
import { userPreSave } from "./hooks";

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

UserSchema.pre("save", userPreSave);

module.exports = model("user", UserSchema);
