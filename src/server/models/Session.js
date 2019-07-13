import { Schema, model } from "mongoose";

const SessionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  started: { type: Date, default: Date.now },
  finished: { type: Date },
  current: { type: Boolean, default: true },
  requests: [
    {
      time: { type: Date, default: Date.now },
      method: { type: String, required: true },
      long: { type: String, required: true }
    }
  ]
});

const Session = model("session", SessionSchema);
module.exports = Session;
