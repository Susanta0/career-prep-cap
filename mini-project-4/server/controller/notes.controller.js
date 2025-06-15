const { notesModel } = require("../models/notesModel");

const notesController = {
  async createNotes(req, res) {
    try {
      const { title, description, categories } = req.body;
      const userId = req.userId;
      const image = req.file?.path || "";

      const newData = new notesModel({
        userId,
        title,
        description,
        categories,
        image,
      });
      await newData.save();
      return res.status(201).json({ message: "Note created", newData });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  },
  async readNotes(req, res) {
    try {
      const notes = await notesModel.find({ userId: req.userId });
      return res.status(200).json({ message: "All notes", notes });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  },
  async updateNotes(req, res) {
    try {
      const { id } = req.params;
      const { title, description, categories } = req.body;

      const existingNote = await notesModel.findById(id);
      if (!existingNote) {
        return res.status(404).json({ message: "Note not found" });
      }
      if (existingNote.userId.toString() !== req.userId) {
        return res.status(403).json({ message: "Unaouthorized" });
      }
      const newImageUrl = req.file?.path || existingNote.image;

      existingNote.title = title || existingNote.title;
      existingNote.description = description || existingNote.description;
      existingNote.categories = categories || existingNote.categories;
      existingNote.image = newImageUrl;

      await existingNote.save();
      return res
        .status(201)
        .json({ message: "Note updated", note: existingNote });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  },
  async deleteNotes(req, res) {
    try {
      const { id } = req.params;
      await notesModel.findByIdAndDelete(id);
      return res.status(200).json({ message: "Note deleted" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  },
};

module.exports = { notesController };
