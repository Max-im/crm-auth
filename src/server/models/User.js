import { Schema, model } from "mongoose";
import { userPreSave } from "./hooks";

const UserSchema = new Schema({
  index: { type: Number, default: 0 },
  text: { type: String },
  site: { type: String },
  role: { type: Schema.Types.ObjectId, ref: "role" },
  group: { type: Schema.Types.ObjectId, ref: "groups" },
  friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  hobby: { type: Array },
  avatar: { type: String },
  age: { type: Number },
  personal: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String }
  },
  address: {
    country: { type: String },
    countryCode: { type: String },
    city: { type: String },
    state: { type: String }
  },
  experience: [
    {
      company: { type: String },
      title: { type: String },
      country: { type: String },
      countryCode: { type: String },
      city: { type: String },
      state: { type: String }
    }
  ],
  education: [
    {
      school: { type: String },
      country: { type: String },
      countryCode: { type: String },
      city: { type: String },
      state: { type: String }
    }
  ],
  created: { type: Date, default: Date.now }
});

UserSchema.pre("save", userPreSave);

module.exports = model("user", UserSchema);
