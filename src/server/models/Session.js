import { Schema, model } from "mongoose";

const SessionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  requests: [
    {
      time: { type: Date, default: Date.now },
      method: { type: String, required: true },
      long: { type: String, required: true }
    }
  ],
  ageAvarage: { type: Number, default: 0 }
});

const Session = model("session", SessionSchema);
module.exports = Session;
