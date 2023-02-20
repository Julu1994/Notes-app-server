import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
const salt = await bcrypt.genSalt();
userSchema.pre("save", async function (next) {
    if (!this.isModified()) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export const User = mongoose.model("user", userSchema);
