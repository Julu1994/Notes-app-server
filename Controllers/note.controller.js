import { Notes } from "../Models/notesSchema.js";
export const addNotes = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res
                .status(400)
                .json({ error: "Required input field is missing" });
        }
        const newNotes = new Notes({
            title,
            description,
            user: req.user,
        });
        const notes = await Notes.create(newNotes);
        res.json(notes);
    } catch (err) {
        req.status(500).json({ message: "Internal server error" });
    }
};

export const displayNotes = async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user._id });
        res.json(notes);
    } catch (err) {
        res.status(404).json({ message: "Not found data" });
    }
};

export const deleteNotes = async (req, res) => {
    try {
        const notesId = req.params.id;
        if (!notesId)
            return res.status(404).json({
                error: "Not found",
            });
        const existingNotes = await Notes.findById(notesId);
        if (!existingNotes)
            return res.status(400).json({
                error: "Not found notes",
            });
        if (existingNotes.user.toString() !== req.user._id.toString()) {
            return res.status(400).json({
                message: "Unauthorised action",
            });
        }
        await existingNotes.delete();
        res.json(existingNotes);
    } catch {
        res.status(500).json({ message: "Server error" });
    }
};

export const editNotes = async (req, res) => {
    try {
        const { title, description } = req.body;
        const notesId = req.params.id;
        if (!title && !description) {
            return res.status(400).json({
                message: "Empty input",
            });
        }

        if (!notesId)
            return res.status(400).json({
                message: "not found notes",
            });
        const existingNotes = await Notes.findById(notesId);

        if (!existingNotes)
            return res.status(400).json({
                message: "not found notes",
            });
        if (existingNotes.user.toString() !== req.user._id.toString()) {
            return res.status(400).json({
                message: "Unauthorised action",
            });
        }
        existingNotes.title = title;
        existingNotes.description = description;
        const editedNotes = await existingNotes.save();
        res.json(editedNotes);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
