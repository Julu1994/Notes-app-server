/**
 * Represents the schema for a user object.
 * @typedef {Object} UserSchema
 * @property {string} email - user email.
 * @property {string} password - user password.
 * @property {Date} createdAt - The timestamp when the note was created.
 * @property {Date} updatedAt - The timestamp when the note was last updated.
 */
/**
 * Defines the Mongoose model for users using the notes schema.
 * @type {import("mongoose").Model<NoteSchema>}
 */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
userSchema.pre("save", async function (next) {
    if (!this.isModified()) {
        return next();
    }
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports.User = mongoose.model("user", userSchema);
