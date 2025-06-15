const { Router } = require("express");
const { notesController } = require("../controller/notes.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const { upload } = require("../utils/cloudinary");

const notesRouter = Router();

notesRouter.post("/notes", authMiddleware, upload.single("image"), notesController.createNotes);
notesRouter.get("/notes", authMiddleware, notesController.readNotes);
notesRouter.put("/notes/:id", authMiddleware, upload.single("image"), notesController.updateNotes);
notesRouter.delete("/notes/:id", authMiddleware, notesController.deleteNotes);

module.exports = { notesRouter };
