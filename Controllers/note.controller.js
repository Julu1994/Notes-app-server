const { Notes } = require("../Models/notesSchema");

/********************************************************
 * @Add notes
 * @Route POST /
 * @description letting the users new notes.
 * @param {string} title.required >> Notes title
 * @param {string}  description.required >> Notes description
 * @returns {Object} A JSON object that shows http status codes.
 ********************************************************/
module.exports.addNotes = async (req, res) => {
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
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.displayNotes = async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user._id });
        res.json(notes);
    } catch (err) {
        return res.status(404).json({ message: "Not found data" });
    }
};
/********************************************************
 * @Add notes
 * @Route POST /:id
 * @description letting the users delete existing notes.
 * @param {string} id.required >> Notes id
 * @returns {Object} A JSON object that shows http status codes.
 ********************************************************/
module.exports.deleteNotes = async (req, res) => {
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
        return res.status(500).json({ message: "Server error" });
    }
};

/********************************************************
 * @Edit notes
 * @Route POST /:id
 * @description letting the users edit existing notes.
 * @param {string} id.required >> Notes id
 * @param {string} title.required >> Notes title
 * @param {string}  description.required >> Notes description
 * @returns {Object} A JSON object that shows http status codes.
 ********************************************************/

module.exports.editNotes = async (req, res) => {
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
