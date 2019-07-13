import { Schema, model } from "mongoose";

const StatSchema = new Schema({
  indexSum: { type: Number, default: 0 },
  nameLongerThenTen: { type: Number, default: 0 },
  ageAvarage: { type: Number, default: 0 }
});

const Stat = model("stat", StatSchema);
module.exports = Stat;
