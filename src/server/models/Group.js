import { Schema, model } from "mongoose";

const GroupSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const Group = model("groups", GroupSchema);
module.exports = Group;
