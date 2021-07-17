const notesRouter = require("express").Router();
const Note = require("../models/note");

// Get all notes
notesRouter.get("/", async (req, res) => {
  const notes = await Note.find({});
  res.json(notes);
});

// Get single note
notesRouter.get("/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

// Create new note
notesRouter.post("/", async (req, res) => {
  const body = req.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  const savedNote = await note.save();
  res.json(savedNote);
});

// Update note
notesRouter.put("/:id", (req, res, next) => {
  const body = req.body;
  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(req.params.id, note, {
    new: true,
  })
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((error) => next(error));
});

// Delete note
notesRouter.delete("/:id", async (req, res) => {
  await Note.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

module.exports = notesRouter;
