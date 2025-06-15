const { Schema, model } = require("mongoose");

const notesSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User"},
    title: { type: String, required: true },
    description: { type: String, required: true },
    categories: { type: String, required: true },
    image: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

const notesModel = model("Note", notesSchema);

module.exports = { notesModel };
