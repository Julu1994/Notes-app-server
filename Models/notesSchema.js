/**
 * Represents the schema for a note object.
 * @typedef {Object} NoteSchema
 * @property {string} title - The title of the note.
 * @property {string} description - The description of the note.
 * @property {string} user - The ID of the user who created the note.
 * @property {Date} createdAt - The timestamp when the note was created.
 * @property {Date} updatedAt - The timestamp when the note was last updated.
 */
/**
 * Defines the Mongoose model for notes using the notes schema.
 * @type {import("mongoose").Model<NoteSchema>}
 */
const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User id is Required"],
        },
    },
    {
        timestamps: true,
    }
);
module.exports.Notes = mongoose.model("notes", notesSchema);
