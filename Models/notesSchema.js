import mongoose from "mongoose";

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

export const Notes = mongoose.model("notes", notesSchema);
