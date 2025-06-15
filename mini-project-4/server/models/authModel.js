const { Schema, model } = require("mongoose");

const authShema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, uniq: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const authModel = model("User", authShema);

module.exports = { authModel };
